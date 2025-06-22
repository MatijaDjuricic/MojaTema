<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenExpiredException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;

class JwtMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $token = null;

        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (TokenExpiredException $e) {
            try {
                $token = JWTAuth::refresh(JWTAuth::getToken());

                JWTAuth::setToken($token);

                $user = JWTAuth::authenticate($token);
            } catch (JWTException $e) {
                return response()->json(['message' => 'Token expired, please log in again'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['message' => 'Token error: ' . $e->getMessage()], 401);
        }

        $response = $next($request);

        if ($token) {
            $response->headers->set('Authorization', 'Bearer ' . $token);

            if ($response->headers->get('Content-Type') === 'application/json') {
                $originalContent = json_decode($response->getContent(), true) ?? [];
                $originalContent['token'] = $token;
                $response->setContent(json_encode($originalContent));
            }
        }

        return $response;
    }
}

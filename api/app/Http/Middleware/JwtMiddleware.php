<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenExpiredException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;
class JwtMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $newToken = null;

        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (TokenExpiredException $e) {
            try {
                $newToken = JWTAuth::refresh(JWTAuth::getToken());
                JWTAuth::setToken($newToken)->authenticate();
            } catch (JWTException $ex) {
                return response()->json(['message' => 'Token expired and cannot be refreshed.'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['message' => 'Invalid token.'], 401);
        }

        $response = $next($request);

        if ($newToken) {
            $response->headers->set('Authorization', 'Bearer ' . $newToken);

            if ($response->headers->get('Content-Type') === 'application/json') {
                $content = json_decode($response->getContent(), true) ?? [];
                $content['token'] = $newToken;
                $response->setContent(json_encode($content));
            }
        }

        return $response;
    }
}
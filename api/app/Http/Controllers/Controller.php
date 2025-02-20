<?php

namespace App\Http\Controllers;
use Illuminate\Http\JsonResponse;

abstract class Controller {
    protected function successResponse($data, $statusCode = 200): JsonResponse {
        return response()->json([
            'message' => 'success',
            'statusCode' => $statusCode,
            'data' => $data,
        ], $statusCode);
    }
    protected function errorResponse($message, $statusCode = 400): JsonResponse {
        return response()->json([
            'message' => 'error: '.$message,
            'statusCode' => $statusCode,
        ], $statusCode);
    }
}
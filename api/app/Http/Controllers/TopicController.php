<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Interfaces\ITopicService;
use App\Http\Requests\Topic\CreateTopicRequest;
use App\Http\Requests\Topic\UpdateTopicRequest;
use App\Http\Requests\Topic\UpdateTopicStatusRequest;
class TopicController extends Controller
{
    public function __construct(private readonly ITopicService $topicService) {}
    public function topicsAll(Request $request) {
        try {
            $search = str($request->input('search'))->lower();
            $data = $this->topicService->getAllTopics($search);
            return $data 
                ? $this->successResponse($data, 200)
                : $this->errorResponse("Topics not found", 404);
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred: ' . $e->getMessage(), 500);
        }
    }
    public function topicsReported() {
        try {
            $data = $this->topicService->getReportedTopics();
            return $data
                ? $this->successResponse($data, 200)
                : $this->errorResponse("Topics not found", 404);
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred: ' . $e->getMessage(), 500);
        }
    }
    public function topicById(int $id) {
        try {
            $data = $this->topicService->getTopicById($id);
            return $this->successResponse($data, 200);
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred: ' . $e->getMessage(), 500);
        }
    }
    public function topicsByProfessor(int $id) {
        try {
            $data = $this->topicService->getTopicsByProfessor($id);
            return $this->successResponse($data, 200);
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred: ' . $e->getMessage(), 500);
        }
    }
    public function createTopic(CreateTopicRequest $request) {
        try {
            $data = $this->topicService->createTopic($request);
            return $this->successResponse($data, 201);
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred: ' . $e->getMessage(), 500);
        }
    }
    public function importTopics(Request $request) {
        try {
            $imported = $this->topicService->importTopics($request);
            if ($imported) return $this->successResponse(['message' => 'Topics imported successfully'], 201);
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred: ' . $e->getMessage(), 500);
        }
    }
    public function updateTopic(UpdateTopicRequest $request, int $id) {
        try {
            $data = $this->topicService->updateTopic($request, $id);
            return $data
                ? $this->successResponse($data, 200)
                : $this->errorResponse('Topic not found', 404);
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred: ' . $e->getMessage(), 500);
        }
    }
    public function updateTopicStatus(UpdateTopicStatusRequest $request, int $id) {
        try {
            $data = $this->topicService->updateTopicStatus($request, $id);
            return $data
                ? $this->successResponse($data, 200)
                : $this->errorResponse('Topic not found', 404);
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred: ' . $e->getMessage(), 500);
        }
    }
    public function deleteTopic(int $id) {
        try {
            $deleted = $this->topicService->deleteTopic($id);
            return $deleted
                ? $this->successResponse(['message' => 'Topic deleted successfully'], 200)
                : $this->errorResponse('Topic not found', 404);
        } catch (\Exception $e) {
            return $this->errorResponse('Error deleting topic: ' . $e->getMessage(), 500);
        }
    }
}
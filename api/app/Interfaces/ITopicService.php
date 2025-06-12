<?php

namespace App\Interfaces;

use App\Http\Requests\Topic\CreateTopicRequest;
use App\Http\Requests\Topic\UpdateTopicRequest;
use App\Http\Requests\Topic\UpdateTopicStatusRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
interface ITopicService {
    public function getAllTopics(string $search = ''): JsonResource;
    public function getReportedTopics(): JsonResource;
    public function getTopicById(int $id): JsonResource;
    public function getTopicsByProfessor(int $id): JsonResource;
    public function createTopic(CreateTopicRequest $request): JsonResource;
    public function importTopics(Request $request): bool;
    public function updateTopic(UpdateTopicRequest $request, int $id): JsonResource;
    public function updateTopicStatus(UpdateTopicStatusRequest $request, int $id): JsonResource;
    public function deleteTopic(int $id): bool;
}
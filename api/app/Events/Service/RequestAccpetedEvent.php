<?php

namespace App\Events\Service;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class RequestAccpetedEvent
{
    use Dispatchable;
    use InteractsWithSockets;
    use SerializesModels;

    public function __construct(private readonly object $user)
    {
        //
    }
    public function broadcastWith(): array
    {
        return [
            'user' => $this->user,
            'createdAt' => now()->toDateTimeString(),
        ];
    }
    public function broadcastAs(): string
    {
        return 'accepted.new';
    }
    public function broadcastOn(): PrivateChannel
    {
        return new PrivateChannel('accepted.room');
    }
}

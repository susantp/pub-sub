<?php

namespace App\Events\Consumer;

use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SearchEvent implements ShouldBroadcast
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
        return 'serviceQuery.new';
    }
    public function broadcastOn(): Channel|array
    {
        return new Channel('public.room');
    }
}

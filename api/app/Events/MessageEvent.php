<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Str;

class MessageEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private $id;
    private $user;
    
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($id, $user)
    {
        $this->id = $id;
        $this->user = $user;
    }
    public function broadcastWith()
    {
        return [
            'id' => $this->id,
            'user' => $this->user,
            'createdAt' => now()->toDateTimeString(),
        ];
    }

    public function broadcastAs()
    {
        return 'message.new';
    }
    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    // public function broadcastOn()
    // {
    //     return new PrivateChannel('channel-name');
    // }
    public function broadcastOn()
    {
        // return ['public.room'];
        return new Channel('public.room');
    }
}

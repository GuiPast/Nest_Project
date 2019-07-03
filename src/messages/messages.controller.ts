import { Controller, Post, Body, Get, Put, Delete } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message-dto';

@Controller('messages')
export class MessagesController {
    @Post()
    create(@Body() createMessageDto:CreateMessageDto){
        return 'Message Created';
    }

    @Get()
    getAllMessages(){
        return 'Messages List';
    }

    @Put(':id')
    update(@Body() updateMessage:CreateMessageDto){
        return 'Message Updated';
    }

    @Delete(':id')
    deleteMessage(){
        return'Message Deleted';
    }
}

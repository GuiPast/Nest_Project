import { Controller, Post, Body, Get, Put, Delete, Res, HttpStatus, Param } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message-dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {

    constructor(private messageService: MessagesService) {}

    @Post()
    create(@Body() createMessageDto:CreateMessageDto, @Res() response){
        this.messageService.createMessage(
            createMessageDto).then(
                message =>{
                    response.status(HttpStatus.CREATED).json(message);
                }
            ).catch(
                () => {response.status(HttpStatus.FORBIDDEN).json({
                        message:'Error creating message'
                    })
                }
            );
    }

    @Get()
    getAllMessages(@Res() response){
        this.messageService.getAll().then(
            messageList => {response.status(HttpStatus.OK).json(messageList);}
        ).catch(
            () => {response.status(HttpStatus.FORBIDDEN).json({
                message:'Error getting all messages'
            })
        }
        );
    }

    @Put(':id')
    update(@Body() updateMessageDto:CreateMessageDto, @Res() response, @Param('id') idMessage){
        this.messageService.updateMessage(idMessage, updateMessageDto).then(
            message => {response.status(HttpStatus.OK).json(message);}
        ).catch(
            () => {response.status(HttpStatus.FORBIDDEN).json({
                message:'Error updating message'})
            }
        );
    }


    @Delete(':id')
    deleteMessage( @Res() response, @Param('id') idMessage){
        this.messageService.deleteMessage(idMessage).then(
            res => {response.status(HttpStatus.OK).json(res);}
        ).catch(
            () => {response.status(HttpStatus.FORBIDDEN).json({
                message:'Error deleting message'})
            }
        );
    }
}

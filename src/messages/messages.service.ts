import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './Entities/message.entity';
import { Repository } from 'typeorm';
import { async } from 'rxjs/internal/scheduler/async';
import { CreateMessageDto } from './dto/create-message-dto';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
    ) {}

    async getAll(): Promise<Message[]>{
        return await this.messageRepository.find();
    }

    async createMessage(newMessage:CreateMessageDto):Promise<Message>{
        const nMessage = new Message();
        nMessage.message = newMessage.message;
        nMessage.nick = newMessage.nick;

        return this.messageRepository.save(nMessage);
    }

    async updateMessage(idMessage: number, messageUpdate: CreateMessageDto):Promise<Message>{
        const uMessage = await this.messageRepository.findOne(idMessage);
        uMessage.nick = messageUpdate.nick;
        uMessage.message = messageUpdate.message;

        return await this.messageRepository.save(uMessage);
    }

    async deleteMessage(idMessage: number):Promise<any>{
        return await this.messageRepository.delete(idMessage);
    }
}

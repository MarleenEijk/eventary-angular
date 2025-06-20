import { Component } from '@angular/core';
import { environment } from '../../environment/environment';
import { ChatService } from './../chat.service';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent {
  // Deze component maakt gebruik van de ChatService om berichten te versturen en ontvangen via een WebSocket verbinding
  constructor(private chatService: ChatService) {
    // Abonneer op de berichten van de ChatService om berichten te ontvangen
      chatService.messages.subscribe(msg => {
        console.log('Response From Websocket Server:', msg);
      });
    }
    // Definieer een bericht object dat we willen versturen
    private message = {
    author: 'Someone secret',
    message: 'Hello there!'
  }

  // Deze methode stuurt een bericht naar de WebSocket server via de ChatService
  sendMsg(){
    console.log('New Message Sent From Client');
    // Stuur het bericht object naar de ChatService
    this.chatService.messages.next(this.message);
  }
}

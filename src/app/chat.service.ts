import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { WebsocketService } from './websocket.service';
import { environment } from '../environment/environment';

export interface Message {
  author: string;
  message: string;
}

const CHAT_URL = environment.CHAT_URL;

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public messages: Subject<Message>;

  constructor(wsService: WebsocketService) {
    // Maak verbinding met de WebSocket server en ontvang berichten
    this.messages = <Subject<Message>>wsService.connect(CHAT_URL).pipe(
      // Verwerk de berichten die van de server komen
      map((response: MessageEvent): Message | null => {
        try {
          // Zet de data van het bericht om naar een object
          const data = JSON.parse(response.data);
          return {
            author: data.author,
            message: data.message
          };
          // Als er een fout optreedt bij het parsen van de data, retourneer dan null
        } catch (e) {
          return null;
        }
      }),
      // Filter de berichten om geen null waarden terug te geven
      filter((msg): msg is Message => msg !== null)
    );
  }
}
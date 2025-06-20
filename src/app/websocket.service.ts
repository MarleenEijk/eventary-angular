import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  // Maakt een subject om berichten te ontvangen en versturen van de WebSocket server
  private subject?: Subject<MessageEvent>;

  constructor() {}

  // Maakt verbinding met de WebSocket server en retourneert een Subject voor berichte
  public connect(url: string): Subject<MessageEvent> {
    // Als de verbinding undefined is, maak dan een nieuwe verbinding
    if (!this.subject) {
      // Maak een websocket verbinding met de opgegeven URL
      this.subject = this.create(url);
      console.log("Successfully connected: " + url);
    }
    // Retourneer het subject dat de verbinding vertegenwoordigt
    return this.subject;
  }

  // Maakt een nieuwe WebSocket verbinding en retourneert een Subject voor berichten
  private create(url: string): Subject<MessageEvent> {
    // Maak een nieuwe lokale variabele voor de WebSocket url
    let ws = new WebSocket(url);
    // Log de status van de WebSocket verbinding
    let observable = new Observable((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });

    // Maak een observer die berichten verstuurt via de WebSocket verbinding
    let observer = {
      // De next methode stuurt een bericht naar de WebSocket server
      next: (data: Object) => {
        // Controleer of de WebSocket verbinding open is voordat we een bericht versturen
        if (ws.readyState === WebSocket.OPEN) {
          // Stuur het bericht als een JSON string
          ws.send(JSON.stringify(data));
        }
      }
    };
    // Maak een Subject dat de observer en observable combineert
    // zodat ik zowel berichten kan ontvangen als versturen
    return Subject.create(observer, observable);
  }
}
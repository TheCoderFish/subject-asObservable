import { Subject, Observable } from "rxjs";
import { map } from "rxjs/operators";

class SecretMessage {
  private msg: string = "xxSecretxx";
  private broadcastInterval: number;

  private msgSource: Subject<string>;
  private msgSource$: Observable<string>;

  constructor() {
    //Subject is initialized
    this.msgSource = new Subject();

    //Subject is transformed into an Observable
    this.msgSource$ = this.msgSource.asObservable();
  }

  //will start pushing data to the stream
  public broadCastSecretMessage(): number {
    return setInterval(() => {
      this.msgSource.next(this.msg);
    }, 1000);
  }

  //will stop data streaming
  public stopBroadCasting(): void {
    clearInterval(this.broadcastInterval);
  }

  //first subscriber will initiate broadcast and return the transformed subject as Observable
  public listenToMessage(): Observable<string> {
    if (!this.broadcastInterval) {
      this.broadcastInterval = this.broadCastSecretMessage();
    }
    return this.msgSource$;
  }
}

// creating instance of the class
const secretMessage = new SecretMessage();

// add subscribers
const subscription1 = secretMessage.listenToMessage().subscribe(console.log);

//call stopBroadCasting() to end broadcast;
//secretMessage.stopBroadCasting();



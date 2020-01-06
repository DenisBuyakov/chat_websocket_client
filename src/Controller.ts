import UserList from "./UserList";
import ChatArea from "./ChatArea";
import Input from "./Input";

interface request {
    requestType: requestType;
    data?: {}
}

enum requestType {
    login = 0,
    say = 1,
    getUsers = 2,
    logOut = 3,
    getMessages = 4,
}

interface response {
    requestType: responseType;
    data?: {}
}

enum responseType {
    newMessage = 0,
    userConnected = 1,
    userDisconnected = 2,
    usersList = 3,
    messagesList = 4,
    serverKick = 5
}

class Controller {
    private userList: UserList;
    private chatArea: ChatArea;
    private input: Input;
    private socket: WebSocket;

    constructor() {
        this.userList = new UserList(document.getElementById('userList'));
        this.chatArea = new ChatArea(document.getElementById('textArea'));
        this.input = new Input(document.getElementById('input'), document.getElementById('button'), (text) => alert(text));
        this.socket.onopen = this.connect;
        this.socket.onmessage = (event) => {
            this.onMessage(event.data);
        };
    }

    public onMessage(data) {
        let a: response = JSON.parse(data);
        switch (+a.requestType) {
            case responseType.newMessage:
                break;
            case responseType.userConnected:
                break;
            case responseType.userDisconnected:
                break;
            case responseType.serverKick:
                break;
            case responseType.messagesList:
                break;
            case responseType.usersList:
                break;
            default:
                break;
        }
        alert(`[message] Данные получены с сервера: ${data}`);
    }

    private connect = () => {
        alert("[open] Соединение установлено");
        alert("Отправляем данные на сервер");
        this.socket.send("Меня зовут Джон");
    };

    private login(name) {
        const data: request = {requestType: requestType.login, data: {name: name}};
        this.socket.send(JSON.stringify(data));
    }

    private getUsers() {
        const data: request = {requestType: requestType.getUsers};
        this.socket.send(JSON.stringify(data));
    }

    private getMessages(count) {
        const data: request = {requestType: requestType.getMessages, data: {count: count}};
        this.socket.send(JSON.stringify(data));
    }

    private say(text) {
        let data: request = {requestType: requestType.say, data: {text: text}};
        this.socket.send(JSON.stringify(data));
    }

    private logOut() {
        let data: request = {requestType: requestType.logOut};
        this.socket.send(JSON.stringify(data));
    }

}
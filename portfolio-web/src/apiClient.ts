export class Client {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl ?? "";
    }

    /**
     * @return OK
     */
    register(body: Users): Promise<AuthResult> {
        let url_ = this.baseUrl + "/register";
        url_ = url_.replace(/[?&]$/, "");
    
        const content_ = JSON.stringify(body);
    
        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        };
    
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processRegister(_response);
        });
    }
    
    protected processRegister(response: Response): Promise<AuthResult> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && response.headers.forEach) { 
            response.headers.forEach((v: any, k: any) => _headers[k] = v); 
        }
    
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result = AuthResult.fromJS(JSON.parse(_responseText));
                return result;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                // Handle error case by returning a failure AuthResult
                let failureResult = new AuthResult({
                    status: AuthResultStatus.Failure,
                    message: `Error ${status}: ${_responseText}`
                });
                return failureResult;
            });
        }
    
        // Handle unexpected status by returning a default failure response
        return Promise.resolve(new AuthResult({
            status: AuthResultStatus.Failure,
            message: "An unexpected error occurred."
        }));
    }
    

    /**
     * @return OK
     */
    login(username: string, password: string): Promise<AuthResult> {
        const url_ = this.baseUrl + "/login";
        const body = JSON.stringify({ username, password });
    
        const options_: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body,
        };
    
        return this.http.fetch(url_, options_)
            .then((response: Response) => this.processLogin(response));
    }
    
    protected processLogin(response: Response): Promise<AuthResult> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && response.headers.forEach) {
            response.headers.forEach((v: any, k: any) => _headers[k] = v);
        }
    
        if (status === 200) {
            return response.json().then((data: AuthResult) => {
                return data;
            });
        } else if (status === 400) { // Adjusted to handle BadRequest (400)
            return response.json().then((data: AuthResult) => {
                return data;
            });
        } else {
            return response.text().then((responseText: string) => {
                return throwException("An unexpected server error occurred.", status, responseText, _headers);
            });
        }
    }
    
    /**
     * @return OK
     */
    health(): Promise<string> {
        let url_ = this.baseUrl + "/health";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processHealth(_response);
        });
    }

    protected processHealth(response: Response): Promise<string> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : _responseText;
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
    
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<string>(null as any);
    }
}

export class Users implements IUsers {
    id?: number;
    username?: string | undefined;
    password?: string | undefined;
    email?: string | undefined;

    constructor(data?: IUsers) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.username = _data["username"];
            this.password = _data["password"];
            this.email = _data["email"];
        }
    }

    static fromJS(data: any): Users {
        data = typeof data === 'object' ? data : {};
        let result = new Users();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["username"] = this.username;
        data["password"] = this.password;
        data["email"] = this.email;
        return data;
    }
}

export interface IUsers {
    id?: number;
    username?: string | undefined;
    password?: string | undefined;
    email?: string | undefined;
}

export class ApiException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new ApiException(message, status, response, headers, null);
}

export interface IAuthResult {
    status: AuthResultStatus;
    message: string;
}

export class AuthResult implements IAuthResult {
    status!: AuthResultStatus;
    message!: string;

    constructor(data?: IAuthResult) {
        if (data) {
            this.status = data.status;
            this.message = data.message;
        }
    }

    static fromJS(data: any): AuthResult {
        data = typeof data === 'object' ? data : {};
        let result = new AuthResult();
        result.status = data["status"];
        result.message = data["message"];
        return result;
    }

    toJSON(): any {
        return {
            status: this.status,
            message: this.message
        };
    }
}

export enum AuthResultStatus {
  Success = 0,
  Failure = 1,
  UsernameAlreadyExists = 2,
  EmailAlreadyExists = 3,
  InvalidCredentials = 4
}
export class User
{
    constructor(
        public email:string,
        public id:string,
        private _token:string,
        private _tokenexpirationdate: Date
        )
    {}

    get token()
    {
        if(!this._tokenexpirationdate||this._tokenexpirationdate < new Date())
        {
            return null;
        }
        return this._token;
    }
}
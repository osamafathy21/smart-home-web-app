class Home {
    constructor(fanSpeed, light1, light2, security) {
        this.fanSpeed = fanSpeed;
        this.light1 = light1;
        this.light2 = light2;
        this.security = security;
    }
    static fromJson(data) {
        let _fanSpeed, _light1, _light2, _security;
        for (let i = 0; i < data.length; i++) {
            if (data[i]['id'] == "62b6f56b1d8472253712816c") {
                _fanSpeed = data[i]['last_value']['value'];
            }
            if (data[i]['id'] == "62221983f0d311000bb71317") {
                _light1 = data[i]['last_value']['value'];
            }
            if (data[i]['id'] == "62c03181a3db1f2308524328") {
                _light2 = data[i]['last_value']['value'];
            }
            if (data[i]['id'] == "62b70f0214c55b23baff3004") {
                _security = data[i]['last_value']['value'];
            }
        }
        return new Home(_fanSpeed, _light1, _light2, _security);
    }
}

export default Home;
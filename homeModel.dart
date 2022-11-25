
class Home {
  final bool light1,light2,secuirty;
  final int fan;

  const Home({
    required this.light1,
    required this.light2,
    required this.secuirty,
    required this.fan,

  });

  factory Home.fromJson(Map<String, dynamic> json) {
    List<dynamic> list = ((json['results'] ?? []) as List);
    late double fanValue ;
    late bool light1Val,light2Val,secVal;
    for (int i =0 ; i < list.length;i++){
      if (list[i]['id']=="62b6f56b1d8472253712816c"){
        fanValue=list[i]['last_value']['value'];
      }
      if (list[i]['id']=="62221983f0d311000bb71317"){
        light1Val=list[i]['last_value']['value']<=0.0?false:true;
      }
      if (list[i]['id']=="62c03181a3db1f2308524328"){
        light2Val=list[i]['last_value']['value']<=0.0?false:true;
      }
      if (list[i]['id']=="62b70f0214c55b23baff3004"){
        secVal=list[i]['last_value']['value']<=0.0?false:true;
      }
    }
    return Home(light1: light1Val, light2: light2Val, secuirty: secVal, fan:fanValue.toInt());
  }
}
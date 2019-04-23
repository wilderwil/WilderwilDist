import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { DataApiService } from '../../services/data-api-service';
import { BujeApiService } from '../../services/buje-api-service';
import { BujeInterface } from '../../models/buje';
import { JugadorInterface } from '../../models/jugador';
import { MonedaPipe } from '../../moneda';
import { NgForm } from '@angular/forms';
import * as jsPDF from 'jspdf'; 
import html2canvas from 'html2canvas';
import { Observable } from 'rxjs/';
import { Subject } from 'rxjs/';

declare var $;
 @Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  constructor(private daService:DataApiService,private baService:BujeApiService) { }
  private jugadores:JugadorInterface[];
  public jugador='';
   public bujes:BujeInterface[];
  public buje='';
  private IVA=1.16;
  private ganancia=1.4;
  private incremento=1.7;
@ViewChild('datatable') table:ElementRef;
dataTable:any;
dtOptions: DataTables.Settings={};
dtTrigger:Subject <any>=new Subject();

  ngOnInit() {
  //	this.getListJugadores();
  this.dtOptions={
  	pagingType:"full_numbers",
  	pageLength:10

};
    this.getListBujes();

     this.dataTable=$(this.table.nativeElement);
     console.log("la tabla",this.dataTable);
   // this.dataTable.dataTable();

  }

  getListJugadores(){
    this.daService.getAllProyects().subscribe(jugadores => {
      console.log("proy",jugadores);
      this.jugadores=jugadores;
    });

  }
  getListBujes(){
    
    this.baService.getAllBujes().subscribe(bujes => {

     
      bujes.map(buje=>{
        let precio=parseFloat(buje.precio);
        precio=precio*this.IVA*this.ganancia*this.incremento;
        buje.precio=precio.toString();})
      this.bujes=bujes;
      this.dtTrigger.next();
     
}); /*
this.bujes=[{
    "CODIGO": "101-12162",
    "DESCRIPCION": "Buje Suspensión, tijera delantera Gm,Malibú,Caprice,Monte Carlo,Nova, Valcant,Modelo 73/79. ",
    "PRECIO": "8004.4524673957"
  },
  {
    "CODIGO": "101-12192",
    "DESCRIPCION": "Buje Suspensión, tijera delantera.Dart,Plimounth,Valiant,Charger,Coronet 60/77 Superior. ",
    "PRECIO": "9690.4402743587"
  },
  {
    "CODIGO": "101-12193",
    "DESCRIPCION": "Buje Suspensión, tijera delantera. Dodge Dart,Plimounth valiant,Charger Coronet, 60/77 superior. ",
    "PRECIO": "9994.5392869429"
  },
  {
    "CODIGO": "101-12219",
    "DESCRIPCION": "Buje Suspensión,Tijera Trasera. Gm,Malibú,Monte Carlo,Chevelle,Camino 64/72 trasero superior. ",
    "PRECIO": "9996.7747550697"
  },
  {
    "CODIGO": "101-12227",
    "DESCRIPCION": "Buje Suspensión, tijera delantera.Dodge,Plimounth, D-100/150/200/250/300 350/ modelo 69/93. ",
    "PRECIO": "11028.100138758"
  },
  {
    "CODIGO": "101-12234",
    "DESCRIPCION": "Buje Suspensión, tijera delantera.Ford F-100/150/350, E-100/150/200,2x2 Bronco 4x4 Modelo 67/79 Ovalado Pequeño. ",
    "PRECIO": "9008.5006873757"
  },
  {
    "CODIGO": "101-12235-12311",
    "DESCRIPCION": "Buje Suspensión, tijera delantera.Gm,Caprice,Impala,Malibú,Camaro, Monte Carlo,Nova, Modelo 62/79 Superior.Buje Suspensión, tijera delantera.Gm Buick,Chevelle,Gran Marquis Superior. ",
    "PRECIO": "8289.4601165553"
  },
  {
    "CODIGO": "101-12253",
    "DESCRIPCION": "Buje Suspensión, Tijera delantera.Ford Fairland,Cougar,Maverick,Mustang, LTD,Galaxie,Dodge Aspen,Lebaron,Modelo 77/80 Superior,Brazo Loco. ",
    "PRECIO": "8152.697936554"
  },
  {
    "CODIGO": "101-12267",
    "DESCRIPCION": "Buje Suspensión, tijera delantera.Ford, LTD,Galaxie,Fairland,Cougar,inferior. ",
    "PRECIO": "10432.698354169"
  },
  {
    "CODIGO": "101-12283",
    "DESCRIPCION": "Buje Suspensión, tijera delantera Pivote. Ford, F-250/350, E-300/35 Model 69/79 Ovalado Grande. ",
    "PRECIO": "9555.2859073128"
  },
  {
    "CODIGO": "101-12297",
    "DESCRIPCION": "Buje Suspensión, tijera delantera.Gm,Malibú,Caprice,Impala,Camaro,Monte Carlo,Camaro,Nova, S-10, Chevrolet Chevel, Inferior. ",
    "PRECIO": "10715.891440091"
  },
  {
    "CODIGO": "101-12298",
    "DESCRIPCION": "Buje Suspensión, tijera delantera.Gm,Malibú,Chevel,Caprice,Impala,Monte carlo,Camaro Nova,S-10 Inferior. ",
    "PRECIO": "11141.607871909"
  },
  {
    "CODIGO": "101-12302",
    "DESCRIPCION": "Buje Suspensión,Tijera delantera.Dodge Truck D-100/150 B100/200/250 Inferior. ",
    "PRECIO": "10128.372443034"
  },
  {
    "CODIGO": "101-12304",
    "DESCRIPCION": "Buje Suspensión, Tijera delantera.Dodge D-300/350 modelos 72/78 Inferior. ",
    "PRECIO": "11691.128311621"
  },
  {
    "CODIGO": "101-12307",
    "DESCRIPCION": "Buje Suspensión, tijera delantera,Dodge,Plimouth,Charget,Coronet,Superior. ",
    "PRECIO": "8347.7627465118"
  },
  {
    "CODIGO": "101-12309",
    "DESCRIPCION": "Buje Suspensión, Tijera delantera. Ford,Fairland,LTD,Galaxie,Cougar,Superior. ",
    "PRECIO": "8700.1274667038"
  },
  {
    "CODIGO": "101-12310-12508",
    "DESCRIPCION": "Buje suspsension, Tijera delantera.Gm,Malibú,Caprice,Impala,Camaro,Nova,Superior.Buje Suspensión,tijera delantera.Gm,malibú,Caprice,Impala,camaro,Nova Superior. ",
    "PRECIO": "9077.6022249233"
  },
  {
    "CODIGO": "101-12312",
    "DESCRIPCION": "Buje Suspensión,Tijera Delantera. Gm, C-10,C-30 Blazer Superior. ",
    "PRECIO": "9259.0384840667"
  },
  {
    "CODIGO": "101-12318",
    "DESCRIPCION": "Buje Suspensión, tijera delantera.Gm, C-10 Blazer Inferior. ",
    "PRECIO": "12841.808926615"
  },
  {
    "CODIGO": "101-12319",
    "DESCRIPCION": "Buje S uspensión, Tijera delantera.Ford Maverick inferior Modelo 73/77. ",
    "PRECIO": "9276.2083970916"
  },
  {
    "CODIGO": "101-12351",
    "DESCRIPCION": "Buje Suspensión, Tijera trasera. Gm, Caprice, Impala,Biscayne Modelo 71/92Malibú 8 Cilindros superior. ",
    "PRECIO": "13570.845839937"
  },
  {
    "CODIGO": "101-12353",
    "DESCRIPCION": "Buje Suspensión,tijera delantera.Dodge Aspen Modelo 76/89, superior. ",
    "PRECIO": "7737.678400426"
  },
  {
    "CODIGO": "101-12355",
    "DESCRIPCION": "Buje Suspensión,Tijera delantera.Gm,malibu,Monte Carlo,Camaro,Chevelle Inferior. ",
    "PRECIO": "10156.850396737"
  },
  {
    "CODIGO": "101-12356",
    "DESCRIPCION": "Buje Suspensión,Tijera Delantera. Ford,Fairmont,Cougar,Zephir,Granada,Mustang, inferior. ",
    "PRECIO": "12392.56481881"
  },
  {
    "CODIGO": "101-12357",
    "DESCRIPCION": "Buje Suspensión,tijera Delantera.Gm,S/10 Blazer Malibú.Monte carlo,InferiorTrasera. ",
    "PRECIO": "9771.1250883389"
  },
  {
    "CODIGO": "101-12364",
    "DESCRIPCION": "Buje Suspensión, Tijera delantera. Gm,S/10,Blazer. Pick-Up. 4x4 Modelo83/98 superior. ",
    "PRECIO": "11091.409577575"
  },
  {
    "CODIGO": "101-12365",
    "DESCRIPCION": "Buje Suspensión, Tijera delantera.Dodge Aspen,lebaron, modelo 77/80 Inferior. ",
    "PRECIO": "10483.902106415"
  },
  {
    "CODIGO": "101-12369",
    "DESCRIPCION": "Buje Suspensión, Tijera delantera. GM,Malibú,Monte Carlo,S/10 Blazer,Pick-Up 4x2 Superior. ",
    "PRECIO": "7758.7296121502"
  },
  {
    "CODIGO": "101-12404",
    "DESCRIPCION": "Buje Suspensión, Tijera Delantera. Ford,F-100/150/250/350 E-100/150, Bronco, 2x2 modelo 80/85Buje pivote sin guia. ",
    "PRECIO": "10276.220628242"
  },
  {
    "CODIGO": "101-12405",
    "DESCRIPCION": "Buje Suspensión,Tijera delantera. Ford F-100/150/250350 Explorer,Bronco4x4 84/93Buje pivote. ",
    "PRECIO": "10865.959270285"
  },
  {
    "CODIGO": "101-12408-12731",
    "DESCRIPCION": "Buje suspenison.Tijera trasera.Ford,Fairmont,Cougar,Zephir,Granada,Mustang,LTD inferior.Buje Suspensión, Tijera Delantera.Ford Fairmont,Cougar,Zephir,Granada Mustang,Inferior. ",
    "PRECIO": "12637.36675259"
  },
  {
    "CODIGO": "101-12412",
    "DESCRIPCION": "Buje Suspensión Ford Fiesta Power, Eco Sport. Tijera delantera. Año 2003-2010 (Pequeño). ",
    "PRECIO": "9883.7858027073"
  },
  {
    "CODIGO": "101-12413",
    "DESCRIPCION": "Buje Suspensión Ford Fiesta Power, Eco Sport. Tijera delantera. Año 2003-2010 (Mediano). Ford Focus año 1999-2008",
    "PRECIO": "12708.139555797"
  },
  {
    "CODIGO": "101-12414",
    "DESCRIPCION": "Buje de suspensión. Ford Fiesta. tijera delantera trasera . Año 1997-2003 (Pequeño). ",
    "PRECIO": "9295.9237404728"
  },
  {
    "CODIGO": "101-12415",
    "DESCRIPCION": "Buje de suspensión. Ford Fiesta. tijera delantera trasera . Año 1997-2003 (Grande). ",
    "PRECIO": "11184.24271469"
  },
  {
    "CODIGO": "101-12438",
    "DESCRIPCION": "Buje Suspensión, Tijera Trasera.Fiat uno 147 premio. ",
    "PRECIO": "7122.9861735345"
  },
  {
    "CODIGO": "101-12439",
    "DESCRIPCION": "Buje Suspensión,tijera delantera.Fiat uno, Palio Modelo Todos. ",
    "PRECIO": "8085.4806312303"
  },
  {
    "CODIGO": "101-12441",
    "DESCRIPCION": "Buje Suspensión, Tijera delantera. GM, Chevette 81/88 inferior. ",
    "PRECIO": "7565.6410904268"
  },
  {
    "CODIGO": "101-12443",
    "DESCRIPCION": "Buje Suspensión. Tijera, Gm,Chevette.Superior Grande. ",
    "PRECIO": "9751.8723640922"
  },
  {
    "CODIGO": "101-12444",
    "DESCRIPCION": "Buje Suspensión.Tijera Delantera. Gm,Monza,Modelo 84/88 Inferior. ",
    "PRECIO": "6517.5070239972"
  },
  {
    "CODIGO": "101-12445",
    "DESCRIPCION": "Buje Suspensión, Tijera Delantera superior. Ford corcel del Rey modelo 81/88. ",
    "PRECIO": "7732.4084144258"
  },
  {
    "CODIGO": "101-12446",
    "DESCRIPCION": "Buje Suspensión, Tijera delantera Inferior.Ford Corcel, del rey modelo 81/82. ",
    "PRECIO": "7582.6507905062"
  },
  {
    "CODIGO": "101-12447",
    "DESCRIPCION": "Buje Suspensión, Tijera Inferior. Ford Corsel del Rey Modelo 83/87 con pestaña. ",
    "PRECIO": "9034.3370334596"
  },
  {
    "CODIGO": "101-12503",
    "DESCRIPCION": "Buje Suspensión,Tijera delantera. Jeep Cherokee Wagoneer Modelo 84/88 Superior. ",
    "PRECIO": "9595.265646757"
  },
  {
    "CODIGO": "101-12504",
    "DESCRIPCION": "Buje Suspensión,Tijera delantera.Jeep Cherokee,Wagoneer Modelo 84/90 Inferior. ",
    "PRECIO": "13012.703711947"
  },
  {
    "CODIGO": "101-12506",
    "DESCRIPCION": "Buje Suspensión,Tijera delantera.Ford Glaxia, Conquidtador, LTD modelo 78/84 inferior. ",
    "PRECIO": "10512.41685333"
  },
  {
    "CODIGO": "101-12532",
    "DESCRIPCION": "Buje Suspensión,Tijera Delantera.Gm Cheyenne,K1500/2500/3500 4x4 Año 88/93 Inferior. ",
    "PRECIO": "14470.146413584"
  },
  {
    "CODIGO": "101-12533",
    "DESCRIPCION": "Suspensión tijera trasera,Gm Cheyenne,K1500/2500/35004x4 año 88/93 Inferior. ",
    "PRECIO": "10849.337469051"
  },
  {
    "CODIGO": "101-12534",
    "DESCRIPCION": "Buje Suspensión,Tijera Delantera. Gm, para camiones C1500/2500/3500 4x2 Tijera Inferior. ",
    "PRECIO": "13841.30506041"
  },
  {
    "CODIGO": "101-12535",
    "DESCRIPCION": "Buje Suspensión, Tijera delantera. Gm, C-1500/2500/3500 4x2 K1500/2500 3500/ 4x4. ",
    "PRECIO": "14415.809177723"
  },
  {
    "CODIGO": "101-12536",
    "DESCRIPCION": "Buje Suspensión, Tijera delantera. Gm, C-1500/2500/3500/ 4x2 K1500/2500 3500 4x4 inferior. ",
    "PRECIO": "12466.920070361"
  },
  {
    "CODIGO": "101-12560",
    "DESCRIPCION": "Buje Suspensión,Tijera Delantera.Ford Galaxia conquistador, LTD modelo 79/89 Inferior. ",
    "PRECIO": "13658.722202956"
  },
  {
    "CODIGO": "101-12572",
    "DESCRIPCION": "Buje Suspensión,Tijera delantera. Cheyenne,GM,C/1500/2500/3500 4x2 K-1500/3500/3500 4x2 K-1500/2500/3500 4x4 superior. ",
    "PRECIO": "13184.690413097"
  },
  {
    "CODIGO": "101-12610",
    "DESCRIPCION": "Buje Suspensión,Tijera delantera. Gm,Century,Celebrity,Lumina APV Inferior. ",
    "PRECIO": "8944.8413781756"
  },
  {
    "CODIGO": "101-12726",
    "DESCRIPCION": "Buje Suspensión, Tijera delantera. Dodge Ram 1500/2500/3500 4x4 model 94/98 superior. ",
    "PRECIO": "10235.337048443"
  },
  {
    "CODIGO": "101-12727",
    "DESCRIPCION": "Buje Suspensión, Tijera delantera. Neon Inferior, Modelo 95/98. ",
    "PRECIO": "8348.3850014276"
  },
  {
    "CODIGO": "101-12728",
    "DESCRIPCION": "Buje Suspensión,Tijera Delantera.Dodge Neon Inferior modelo 95/98. ",
    "PRECIO": "13212.784398525"
  },
  {
    "CODIGO": "101-12728-A",
    "DESCRIPCION": "Buje suspensión Tijera delantera.Dodge Neón, modelo 2000 en adelante. ( Grande). ",
    "PRECIO": "13441.727797109"
  },
  {
    "CODIGO": "101-12728-B",
    "DESCRIPCION": "Buje suspensión Tijera delantera.Dodge Neón, modelo 2000 en adelante. ( Pequeño). ",
    "PRECIO": "6330.6092415991"
  },
  {
    "CODIGO": "101-12729",
    "DESCRIPCION": "Buje Suspensión,Tijera delantera.Ford,Explorer,ranger 4x2,4x4 Meseta Superior. ",
    "PRECIO": "12221.977125672"
  },
  {
    "CODIGO": "101-12730",
    "DESCRIPCION": "Buje Suspensión,Tijera delantera.Ford Explorer 4x2,4x4 Inferior. ",
    "PRECIO": "11335.274667753"
  },
  {
    "CODIGO": "101-12745",
    "DESCRIPCION": "Buje Suspensión, Tijera delantera.Ford F-100/150/ Fortaleza Expedittion 4x4 Inferior. Punta delantera.",
    "PRECIO": "12203.315247662"
  },
  {
    "CODIGO": "101-12746",
    "DESCRIPCION": "Buje Suspensión,Tijera Delantera.Ford,F-100/150 Fortaleza Expedittion 4x4 Inferior. Punta trasera.",
    "PRECIO": "13426.837553682"
  },
  {
    "CODIGO": "101-171813",
    "DESCRIPCION": "Buje suspensión Tijera trasera Terios. Todos los modelos. ",
    "PRECIO": "7249.4528409282"
  },
  {
    "CODIGO": "101-3001-T",
    "DESCRIPCION": "Buje tensor Delantero Corsa. Todos los modelos. ",
    "PRECIO": "12008.462287652"
  },
    {
    "CODIGO": "101-3001-K",
    "DESCRIPCION": "Buje pequeño Delantero Corsa. Todos los modelos. ",
    "PRECIO": "6524.3201304931"
  },
  {
    "CODIGO": "101-5087",
    "DESCRIPCION": " Aveo Buje Suspensión tijera parte superior delantera (pequeño). ",
    "PRECIO": "4880.4085335658"
  },
  {
    "CODIGO": "101-5088",
    "DESCRIPCION": " Aveo Buje Suspensión tijera delantera parte inferior trasera o punta trasera (grande). ",
    "PRECIO": "9412.3653203764"
  },
  {
    "CODIGO": "101-5274",
    "DESCRIPCION": " Suspensión trasera Century Celebrity, todos los modelos. ",
    "PRECIO": "10465.556427087"
  },
  {
    "CODIGO": "101-80722-A",
    "DESCRIPCION": "Muk,Buje para meseta,ford exploren,Tijera delantera Inferior. Todos los Modelos. Año 2005 en adelante. ",
    "PRECIO": "14067.891053722"
  },
  {
    "CODIGO": "101-80722-B",
    "DESCRIPCION": "Muk,Buje para meseta,ford exploren,Tijera delantera Inferior. Todos los Modelos. Año 2005 en adelante. ",
    "PRECIO": "18174.075120111"
  },
  {
    "CODIGO": "101-80723",
    "DESCRIPCION": "Muk,Buje para meseta,ford exploren,Tijera delantera superior. Todos los Modelos. Año 2006 en adelante. ",
    "PRECIO": "14868.814205041"
  },
  {
    "CODIGO": "101-8135",
    "DESCRIPCION": "Buje Suspensión,Tijera. Ford Fairlan,LTD inferior,Suspensión trasera. ",
    "PRECIO": "10998.878052595"
  },
  {
    "CODIGO": "101-8136",
    "DESCRIPCION": "Buje Suspensión,Tijera Trasera Ford LTD,superior. ",
    "PRECIO": "13560.672875852"
  },
  {
    "CODIGO": "101-8201-P",
    "DESCRIPCION": "Buje Suspensión, Tijera. Ford Fairland superior, Suspensión trasera. (pequeño). ",
    "PRECIO": "10349.510708244"
  },
  {
    "CODIGO": "101-8201-G",
    "DESCRIPCION": "Buje Suspensión, Tijera. Ford Fairland superior, Suspensión trasera. (grande). ",
    "PRECIO": "12667.741688695"
  },
  {
    "CODIGO": "101-828",
    "DESCRIPCION": "Buje tijera delantera(fijo) Toyota Corolla Avila del 86-89-sirve para la tijera trasera Diametro interior 12 mm. ",
    "PRECIO": "6632.7656175484"
  },
  {
    "CODIGO": "101-828-A",
    "DESCRIPCION": "Buje externo (Grande) Toyota Corolla Avila 86-89 sirve para la tijera trasera. ",
    "PRECIO": "6849.8445025824"
  },
  {
    "CODIGO": "101-828-B",
    "DESCRIPCION": "Buje tijera delantera(fijo) Toyota Corolla, Aralla y Ski del 89 en adelante -sirve para la tijera trasera- Diametro interior 14 mm. ",
    "PRECIO": "8330.5028575402"
  },
  {
    "CODIGO": "101-828-C",
    "DESCRIPCION": "Buje externo (Grande) Toyota Corolla Araya Ski 89 en adelante sirve para la tijera trasera. ",
    "PRECIO": "8475.1659123256"
  },
  {
    "CODIGO": "101-8637-G",
    "DESCRIPCION": "Buje Suspensión,tijera.Ford Zephir, Fairmont,superior,Suspensión trasera. (grande)",
    "PRECIO": "11680.940145662"
  },
  {
    "CODIGO": "101-8637-P",
    "DESCRIPCION": "Buje Suspensión,tijera.Ford Zephir, Fairmont,superior,Suspensión trasera. (pequeño)",
    "PRECIO": "11165.271821973"
  },
  {
    "CODIGO": "101-8637-A-G",
    "DESCRIPCION": "Buje Suspensión, tijera. Ford Zephir,Cougar,granada,nacional inferior, Suspensión trasera. (grande). ",
    "PRECIO": "13671.137131928"
  },
  {
    "CODIGO": "101-8637-A-P",
    "DESCRIPCION": "Buje Suspensión, tijera. Ford Zephir,Cougar,granada,nacional inferior, Suspensión trasera. (Pequeño). ",
    "PRECIO": "11467.902016867"
  },
  {
    "CODIGO": "101-8637-B-G",
    "DESCRIPCION": "Buje Suspensión, tijera trasera.Ford Zephir,Cougar,Granada, Inferior. (grande)",
    "PRECIO": "17642.357332479"
  },
    {
    "CODIGO": "101-8637-B-P",
    "DESCRIPCION": "Buje Suspensión, tijera trasera.Ford Zephir,Cougar,Granada, Inferior. (pequeño)",
    "PRECIO": "12603.665151739"
  },
  {
    "CODIGO": "101-8638-A",
    "DESCRIPCION": "Buje Suspensión,Tijera trasera.Inferior Ford Conquistador,LTD,patrulla, modelo. ",
    "PRECIO": "11276.420991734"
  },
  {
    "CODIGO": "101-8638",
    "DESCRIPCION": "Buje Suspensión,Tijera trasera.Superior conquistador. LTD,patrulla. ",
    "PRECIO": "11757.685152979"
  },
  {
    "CODIGO": "101-93714",
    "DESCRIPCION": "Trail Blazer Suspensión Delantera (Buje pequeño) Todos los modelos. ",
    "PRECIO": "9834.8085788545"
  },
  {
    "CODIGO": "101-93714-A",
    "DESCRIPCION": "Trail Blazer Suspensión,tijera Delantera inferior (Grande) Todos los modelos. ",
    "PRECIO": "16659.363682648"
  },
  {
    "CODIGO": "101-93714-B",
    "DESCRIPCION": "Trail Blazer Suspensión,tijera Delantera, inferior. ( Pequeño) Todos los modelos. ",
    "PRECIO": "13284.501827261"
  },
  {
    "CODIGO": "101-LUV1600",
    "DESCRIPCION": "Buje Tijera Superior Delantera LUV 1600. Todos los modelos. ",
    "PRECIO": "7925.4213811345"
  },
  {
    "CODIGO": "101-LUV2300",
    "DESCRIPCION": "Buje Tijera Superior Delantera 4x4LUV 2300. Todos los modelos. ",
    "PRECIO": "8523.5659057921"
  },
  {
    "CODIGO": "101-0613-B",
    "DESCRIPCION": "Buje de Meseta. Spark, Matiz, Tico, Wagon. ",
    "PRECIO": "5241.9227409991"
  },
  {
    "CODIGO": "101-0586-BM",
    "DESCRIPCION": "Buje Estabilizadora de la Meseta. Spark, Matiz, Tico, Wagon. ",
    "PRECIO": "4033.0354830466"
  },
  {
    "CODIGO": "101-2618-GE",
    "DESCRIPCION": "Goma Abrasadera, Barra Estabilizadora. Spark, Matiz, Tico, Wagon. ",
    "PRECIO": "4144.2257060117"
  },
  {
    "CODIGO": "101-321724-1",
    "DESCRIPCION": "Buje Meseta Delantera Inferior, Ford Explorer 2002/2005.",
    "PRECIO": "15426.661901275"
  },
  {
    "CODIGO": "101-321724-2",
    "DESCRIPCION": "Buje Meseta Delantera Inferior, Ford Explorer 2002/2005 ",
    "PRECIO": "10965.848446011"
  },
  {
    "CODIGO": "101-321712-2",
    "DESCRIPCION": "Buje Meseta Delantera Superior, Ford Explorer 2002/2005 ",
    "PRECIO": "14405.231478573"
  },
  {
    "CODIGO": "101-90206",
    "DESCRIPCION": " Jeep cherokee Limited, Tijera delantera Superior Año 2006-2010. ",
    "PRECIO": "11196.061861814"
  },
  {
    "CODIGO": "101-89981",
    "DESCRIPCION": " Jeep Grand cherokee Limited, Tijera delantera inferior Año 2006-2010. ",
    "PRECIO": "17397.004287554"
  },
  {
    "CODIGO": "101-89982",
    "DESCRIPCION": " Jeep Grand cherokee Limited, Tijera delantera inferior Año 2006-2010. Pasante Amortiguador ",
    "PRECIO": "15469.526993275"
  },
  {
    "CODIGO": "101-89983",
    "DESCRIPCION": " Jeep Grand cherokee Limited, Tijera delantera inferior Año 2006-2010. ",
    "PRECIO": "8422.2980986028"
  },
  {
    "CODIGO": "101-94601",
    "DESCRIPCION": "Buje tijera inferior delantera 4x2 luv 2300 todos los modelos. ",
    "PRECIO": "10223.191601081"
  },
  {
    "CODIGO": "101-94604-G",
    "DESCRIPCION": "Buje tijera inferior delantera luv 3500 dimax 4x4 grande. ",
    "PRECIO": "10806.478738041"
  },
    {
    "CODIGO": "101-94604-P",
    "DESCRIPCION": "Buje tijera inferior delantera luv 3500 dimax 4x4 pequeño. ",
    "PRECIO": "10454.902533222"
  },
  {
    "CODIGO": "101-17808",
    "DESCRIPCION": "Buje de la araña meseta superior derecho izquierdo jeep grand cherokee 2011/2014. ",
    "PRECIO": "13451.562865647"
  },
  {
    "CODIGO": "101-8425",
    "DESCRIPCION": "Buje bumerang jeep liberety grand cherokee año 99-2007. ",
    "PRECIO": "15641.01937463"
  },
  {
    "CODIGO": "101-8951-AB",
    "DESCRIPCION": "Buje diferencial delantero grand cherokee 2006-2010. ",
    "PRECIO": "15168.783657006"
  },
  {
    "CODIGO": "101-6688",
    "DESCRIPCION": "Buje meseta superior de Avalanche, Tahoe, Silverado y Hummer. Año 2005 en adelante.",
    "PRECIO": "11760.882973758"
  },
  {
    "CODIGO": "101-828-D",
    "DESCRIPCION": "Buje meseta Tijera Baby Camry Toyota Corolla Trompito grande Año 1994-2002.",
    "PRECIO": "9266.964828362"
  },
  {
    "CODIGO": "101-981",
    "DESCRIPCION": "Buje para Tijera Ford Ka (grande).",
    "PRECIO": "8500.242917228"
  },
  {
    "CODIGO": "101-980",
    "DESCRIPCION": "Buje para Tijera Ford Ka (pequeño).",
    "PRECIO": "8082.9341165103"
  },
  {
    "CODIGO": "101-17809",
    "DESCRIPCION": "Buje Suspensión Tijera Inferior Jeep Cherokee Año 2011-2014.",
    "PRECIO": "15945.62163405"
  },
  {
    "CODIGO": "101-17810",
    "DESCRIPCION": "Buje Suspensión Tijera Inferior Jeep Cherokee Año 2011-2014.",
    "PRECIO": "17466.588620682"
  },
  {
    "CODIGO": "101-17811",
    "DESCRIPCION": "Buje Suspensión Tijera Inferior Jeep Cherokee Año 2011-2014. (amortiguador)",
    "PRECIO": "13639.63942851"
  },
  {
    "CODIGO": "101-9030-A",
    "DESCRIPCION": "Buje de Meseta delantera Cherry Orinoco grande",
    "PRECIO": "10663.941114341"
  },
  {
    "CODIGO": "101-9030-B",
    "DESCRIPCION": "Buje de Meseta delantera Cherry Orinoco grande (GOMA)",
    "PRECIO": "8036.593303561"
  },
  {
    "CODIGO": "101-54551",
    "DESCRIPCION": "Buje tijera delantera Hyundai Tucson, Kia Sportage (pequeño)",
    "PRECIO": "8095.4694449791"
  },
  {
    "CODIGO": "101-54552",
    "DESCRIPCION": "Buje tijera delantera Hyundai Tucson, Kia Sportage (grande)",
    "PRECIO": "11775.228283606"
  },
  {
    "CODIGO": "101-5041-A",
    "DESCRIPCION": "Buje de meseta delantera inferior Dodge Caliber (2007-2011), Jeep Compass (2007-2010), Lancer, Tourin, Patriot",
    "PRECIO": "6413.8196557266"
  },
  {
    "CODIGO": "101-5041-B",
    "DESCRIPCION": "Buje de meseta delantera inferior Dodge Caliber (2007-2011), Jeep Compass (2007-2010), Lancer, Tourin, Patriot",
    "PRECIO": "7890.9322004424"
  },
  {
    "CODIGO": "101-8721",
    "DESCRIPCION": "Buje tijera superior delantero Ford F150 Fortaleza 4x2/4x4 Modelo 98/2006",
    "PRECIO": "12618.804079115"
  },
  {
    "CODIGO": "101-35050",
    "DESCRIPCION": "Buje Tijera Inferior Toyota Prado-Merú-4Runner año 2001/2002",
    "PRECIO": "16190.408107666"
  },
  {
    "CODIGO": "101-35080",
    "DESCRIPCION": "Buje Tijera Superior Toyota Prado-Merú-4Runner año 2001/2002",
    "PRECIO": "9228.5326213698"
  },
    {
    "CODIGO": "101-48654-60030",
    "DESCRIPCION": "Buje de tijera Inferior Der e Izq, Toyota 4Runner 04/09,FJ(Todos),buje mediano, punta delantera. Pasador 19,5 mm",
    "PRECIO": "19047.6"
  },
  {
    "CODIGO": "101-48654-OK040",
    "DESCRIPCION": "Buje de tijera Inferior Der e Izq, Toyota Fortunner y Hilux Kavak06/13, buje mediano, Punta delantera, pasador 14,2 mm",
    "PRECIO": "19047.6"
  },
  {
    "CODIGO": "101-48655",
    "DESCRIPCION": "Buje de tijera Inferior Der e Izq, Toyota 4Runner 04/09, FJ(Todos), Fortunner, Hilux kavak 06/13, Buje Grande punta trasera.",
    "PRECIO": "22956.16752"
  },
  {
    "CODIGO": "101-48632-60020",
    "DESCRIPCION": "Buje de meseta Sup.,Toyota 4Runner 04/09, Fortunner, FJ-Cruiser(Todas), Prado(07-11) y Hilux Kavak 06/13 (REFORZADO) (dos bujes iguales)",
    "PRECIO":"13843.79568"
  },
  {
    "CODIGO": "101-35009",
    "DESCRIPCION": "Buje superior tijera delantera, Toyota Hilux , año 98/2005",
    "PRECIO": "10601.89416"
  },
  {
    "CODIGO": "101-35010",
    "DESCRIPCION": "Buje inferior tijera delantera, punta trasera (grande) Toyota Hilux , año 98-2005",
    "PRECIO": "22933.3104"
  },
  {
    "CODIGO": "101-35011",
    "DESCRIPCION": "Buje inferior tijera delantera, punta delantera (mediano) Toyota Hilux , año 98-2005",
    "PRECIO": "19047.6"
  },
  {
    "CODIGO": "101-12170",
    "DESCRIPCION": "Buje de suspensión TOYOTA COROLLA tijera delantera (grande) modelo 2003-2015",
    "PRECIO": "14545.44"
  },
  {
    "CODIGO": "101-12120",
    "DESCRIPCION": "Buje de Suspensión Toyota Corolla Tijera Delantera Punta Delantera Modelo 2003-2015 (pequeño) Buje Nuevo",
    "PRECIO": "7909.2"
  },
  {
    "CODIGO": "101-88634",
    "DESCRIPCION": "Buje Tijera Superior Cherokee Liberty KJ 2002-2007 y Cherokee Liberty KK 2008-2013. BUJE NUEVO",
    "PRECIO": "10576.8"
  },
  {
    "CODIGO": "101-88476",
    "DESCRIPCION": "Buje Tijera Inferior pasante amortiguador Cherokee Liberty KK Y KJ. Modelos 2002-2007 BUJE NUEVO",
    "PRECIO": "15490.8"
  },
  {
    "CODIGO": "102-003",
    "DESCRIPCION": "Nizan Patrol delantero y trasero.",
    "PRECIO": "8399.3937260928"
  },
  {
    "CODIGO": "102-100",
    "DESCRIPCION": "Buje Ballesta.Ford F-300,F-600,F-750 año 67/79 delantero I= 19.17 E= 92.7 L=62.98. ",
    "PRECIO": "10148.492599385"
  },
  {
    "CODIGO": "102-101-70",
    "DESCRIPCION": "Buje Ballesta. Ford F-300 I=16.15, E=31.75 L=63.50.Buje Ballesta, Ford-350 1966 Trasero Dodge Dart GT. ",
    "PRECIO": "10039.134215065"
  },
  {
    "CODIGO": "102-110",
    "DESCRIPCION": "Buje Ballesta Ford F-350,I-16.15,E=35, L=63.50. ",
    "PRECIO": "8621.953618787"
  },
  {
    "CODIGO": "102-110A",
    "DESCRIPCION": "Buje Ballesta. Ford F-350, I=16.15,E=35,L=63,50. ",
    "PRECIO": "8617.077635997"
  },
  {
    "CODIGO": "102-117",
    "DESCRIPCION": "Buje Ballesta, Ford F-350,I=16,15,E-35,L63.50. ",
    "PRECIO": "8710.8592500898"
  },
  {
    "CODIGO": "102-129-136A",
    "DESCRIPCION": "Buje Ballesta Chevrolet. Chevrolet Busetas (Tubo central de 5/8). ",
    "PRECIO": "9245.3417664896"
  },
  {
    "CODIGO": "102-131-160",
    "DESCRIPCION": "Buje ballesta Ford F-100 Delantero modelo 73/79.Buje Ballestas. Ford,F-100/150 Modelo 73/79, F-150 Trasero. ",
    "PRECIO": "7939.7948277641"
  },
  {
    "CODIGO": "102-132",
    "DESCRIPCION": "Buje Ballesta, Ford Ecoline, Modelo 78/80 E-350 86.",
    "PRECIO": "9444.4077421521"
  },
  {
    "CODIGO": "102-133",
    "DESCRIPCION": "Buje Ballesta.Ford Ecoline 78/80 E-350 86. ",
    "PRECIO": "9801.4614349496"
  },
  {
    "CODIGO": "102-136",
    "DESCRIPCION": "Buje Ballesta, Chevrolet Pick-Up C-30/31,modelo 73/88.",
    "PRECIO": "9553.4111472468"
  },
  {
    "CODIGO": "102-144-145",
    "DESCRIPCION": "Buje Ballesta, Jeep CJ-5,CJ-7 Delantero Modelo 74/79 delantero.Buje Ballesta,Jeep CJ-5,CJ7,CJ-8 trasero 1984. ",
    "PRECIO": "8793.9901636074"
  },
  {
    "CODIGO": "102-156",
    "DESCRIPCION": "Buje Ballesta. Ford, F-350 Delantero. ",
    "PRECIO": "8025.4870418693"
  },
  {
    "CODIGO": "102-157",
    "DESCRIPCION": "Buje Ballesta. Bronco 6 Cilindros Modelo 90/94 Bronco 6 Cilindros modelo 90/94. ",
    "PRECIO": "10360.713940233"
  },
  {
    "CODIGO": "102-158",
    "DESCRIPCION": "Buje Ballesta trasera, Ford 350 modelo 92/2000 Bronco 6 Cilindros modelo 90/94 4x4. ",
    "PRECIO": "10539.237336557"
  },
  {
    "CODIGO": "102-159",
    "DESCRIPCION": "Buje Ballesta. Ford Custion Lariat modelo 80/82 Caribe Todas. ",
    "PRECIO": "10268.460074067"
  },
  {
    "CODIGO": "102-170",
    "DESCRIPCION": "Buje de Ballesta jeep cherokee, wagonier, limite, comanche modelo 88 en adelante,Buje tensores. ",
    "PRECIO": "12076.979888563"
  },
  {
    "CODIGO": "102-172",
    "DESCRIPCION": "Cheyenne1500/3500 Ballesta trasera. ",
    "PRECIO": "11036.257312553"
  },
  {
    "CODIGO": "102-173",
    "DESCRIPCION": "Buje Ballesta. Ford 350 Modelo 92/200 F-15 Bronco. ",
    "PRECIO": "10100.249979594"
  },
  {
    "CODIGO": "102-37",
    "DESCRIPCION": "Buje Ballesta. Jeep Willis, 4 Cilindros Modelo 55/65 Tambien CJ-5 y CJ-6 modelos 55/65 Tambien CJ-5 y CJ-6 modelos 62/76. ",
    "PRECIO": "7405.9645918442"
  },
  {
    "CODIGO": "102-413",
    "DESCRIPCION": "Buje Ballesta, delantero de las dos puntas. Chevrolet NPR 97/2000. ",
    "PRECIO": "10034.305896337"
  },
  {
    "CODIGO": "102-414-A",
    "DESCRIPCION": "Buje Ballesta Trasera. Balancin NPR todos los modelos (con pestaña) Chevrolet. ",
    "PRECIO": "10334.016849703"
  },
  {
    "CODIGO": "102-52",
    "DESCRIPCION": "Buje Ballesta. Ford F-100 modelo 57/67. Chevrolet. ",
    "PRECIO": "8520.6024186229"
  },
  {
    "CODIGO": "102-57",
    "DESCRIPCION": "Buje Ballesta. Pick-Up, Dodge D-100/300 delantero. ",
    "PRECIO": "8906.3659557829"
  },
  {
    "CODIGO": "102-58",
    "DESCRIPCION": "Buje Ballesta. Dodge 300 Trasero. ",
    "PRECIO": "9981.2488862375"
  },
  {
    "CODIGO": "102-60",
    "DESCRIPCION": "Buje Ballesta, Dodge Dart Trasera Modelo 66/77 Microbus Craysler B-200 Trasero 70/77. ",
    "PRECIO": "11297.775557815"
  },
  {
    "CODIGO": "102-67-A-153",
    "DESCRIPCION": "Buje Ballesta.Pick-Up, Wagoneer 6 Cilindros, Modelo 79/82 Wagoneer de Lujo 80/79/82 Delantera y trasera. Buje Ballesta, Wagoneer 1980/1982. ",
    "PRECIO": "11593.344105596"
  },
  {
    "CODIGO": "102-73",
    "DESCRIPCION": "Buje Ballesta, Chevrolet C-60/70 Modelo 67/80 Delantero. ",
    "PRECIO": "11873.398100968"
  },
  {
    "CODIGO": "102-75",
    "DESCRIPCION": "Buje Ballesta. Internacional serie S 78/80 Chevrolet,C-50 67/68 C-66/70, 67/83 . ",
    "PRECIO": "11307.970191565"
  },
  {
    "CODIGO": "102-75-A",
    "DESCRIPCION": "International serie S-1978-1980 Chevrolet C-50 1967-1968 C-60/70 1967-1983. ",
    "PRECIO": "10938.581160971"
  },
  {
    "CODIGO": "102-77",
    "DESCRIPCION": "Buje Ballesta.Wagoneer Pick-Up modelo 74/78, C30 73/78 trasero,I=14.14, E=44.25,L=63.50. ",
    "PRECIO": "10677.369936955"
  },
  {
    "CODIGO": "102-82",
    "DESCRIPCION": "Ford Fairland,Maverick,Falcon trasero. ",
    "PRECIO": "11471.186320889"
  },
  {
    "CODIGO": "102-85",
    "DESCRIPCION": "Buje Ballesta.Wagoneer 6 Cilindros 74 Delantero Y trasero. ",
    "PRECIO": "8093.4723499603"
  },
  {
    "CODIGO": "102-88",
    "DESCRIPCION": "Buje ballesta,CJ-7,CJ-6,CJ-5. ",
    "PRECIO": "9171.7626618711"
  },
  {
    "CODIGO": "102-94",
    "DESCRIPCION": "Buje de Ballesta Chevrolet C-60 C-70 15/16 X Ovalado. Punta delantera. Todos los Modelos.",
    "PRECIO": "13034.905777525"
  },
  {
    "CODIGO": "102-Kdk-001",
    "DESCRIPCION": "Buje Ballesta.Trasera Kodiak (corto).",
    "PRECIO": "17767.210280671"
  },
  {
    "CODIGO": "102-kdk-002",
    "DESCRIPCION": "Buje Ballesta del tren delantero Camion Kodiak. ",
    "PRECIO": "13600.944914086"
  },
  {
    "CODIGO": "102-TY-402",
    "DESCRIPCION": "Buje Ballesta.Sustituye Goma ResorteToyota Grande I=18,E=35.50,L=69. ",
    "PRECIO": "10155.091261389"
  },
  {
    "CODIGO": "102-308-PV",
    "DESCRIPCION": "Buje Ballesta Toyota Macho 1978/2000 en PVC",
    "PRECIO": "3885.7104"
  },
  {
    "CODIGO": "102-308-TPU",
    "DESCRIPCION": "Buje Ballesta Toyota Macho 1978/2000 en Poliuretano",
    "PRECIO": "8914.2768"
  },
  {
    "CODIGO": "102-227-G",
    "DESCRIPCION": "Buje Ballesta Triton Ford 350 Punta delantera 00/10 (Grande)",
    "PRECIO": "12529.51128"
  },
  {
    "CODIGO": "102-227-P",
    "DESCRIPCION": "Buje Ballesta Triton Ford-350 Punta Trasera 00/10 (Pequeño)",
    "PRECIO": "11390.4648"
  },
  {
    "CODIGO": "102-440",
    "DESCRIPCION": "Buje ballesta trasera punta delantera NPR (interior 18mm",
    "PRECIO": "11037.744747734"
  },
  {
    "CODIGO": "103-063",
    "DESCRIPCION": "Base de caja chevrolet corsa, chevy, automático, parte trasera,con C08+ML4 1996-2004 (90538063). ",
    "PRECIO": "23624.643780384"
  },
  {
    "CODIGO": "103-169-437",
    "DESCRIPCION": "Base de Motor,Chevrolet Corsa,sincrónico, lado derecho con ML4+C60+N40 CEJW 1996-2004. Base motor Delantera.Izquierda Daewo,Cielo,Espero, Racer todos (90250437)(90495169). Sin Aire, Automático. ",
    "PRECIO": "23019.446753334"
  },
  {
    "CODIGO": "103-170",
    "DESCRIPCION": "Base de Motor, Chevrolet Corsa,parte delantera lado Izquierdo. Con ML+C60 CEJ. 1996-2004 lado Izquierdo. Con Aire. (90495170). ",
    "PRECIO": "28573.002847651"
  },
  {
    "CODIGO": "103-300",
    "DESCRIPCION": "Base motor Chevrolet Corsa con CEJW 40+N51+C60+M79 1996-2004 (90445300). ",
    "PRECIO": "31328.854811885"
  },
  {
    "CODIGO": "103-328-462",
    "DESCRIPCION": "Base para Caja Chevrolet Corsa.parte trasera con CEJW+M79/M64+C60 1996-2004 (93230328) Base Motor delantera. Lanos, Daewo,Cielo,Espero,Racer, Sincrónico. Todos (90372462) ",
    "PRECIO": "22287.022649166"
  },
  {
    "CODIGO": "103-2441",
    "DESCRIPCION": "Base Motor Ford 150-300-350 Parte derecha hasta 1986. ",
    "PRECIO": "39768.186740592"
  },
  {
    "CODIGO": "103-2442",
    "DESCRIPCION": "Base Motor Ford 150-300-350 Parte izquierda hasta 1986. ",
    "PRECIO": "39697.508200088"
  },
  {
    "CODIGO": "103-2292",
    "DESCRIPCION": "Base Motor Chevrolet Malibú ,Montecarlo 78/84. Motor 200/229/231.S-10,T-10 Blazer Motor 262. Cheyenne. ",
    "PRECIO": "28145.696420115"
  },
  {
    "CODIGO": "103-656",
    "DESCRIPCION": "Base Motor Daewo Delantera Derecho, Cielo, Espero, Racer. Todos los modelos. ",
    "PRECIO": "30727.968753291"
  },
  {
    "CODIGO": "103-BA35011",
    "DESCRIPCION": "Base de Amortiguador Delantera Aveo. Todos los modelos.",
    "PRECIO": "16614"
  },
  {
    "CODIGO": "103-BA312",
    "DESCRIPCION": "Base de Amortiguador Delantera Corsa. Todos los modelos. ",
    "PRECIO": "23966.997351003"
  },
  {
    "CODIGO": "103-1051",
    "DESCRIPCION": "Base de motor delantera derecha, ford fiesta 1.6 2003 en adelante, ecosport 1.6 2004/2005. ",
    "PRECIO": "32731.39584"
  },
  {
    "CODIGO": "103-1051-SA",
    "DESCRIPCION": "Base de motor delantera derecha, ford fiesta 1.6 2003 en adelante, ecosport 1.6 2004/2005 sin aluminio. ",
    "PRECIO": "27824.73408"
  },
  {
    "CODIGO": "103-9064",
    "DESCRIPCION": "Base de motor delantera derecha, ecosport 2.0 todos los modelos. ",
    "PRECIO": "37923.07896"
  },
  {
    "CODIGO": "103-9064-SA",
    "DESCRIPCION": "Base de motor delantera derecha, ecosport 2.0 todos los modelos sin alumino. ",
    "PRECIO": "32534.51292"
  },
  {
    "CODIGO": "103-3110-BM",
    "DESCRIPCION": "Soporte Superior Para Motor Century, Celebrity, Corsica, Cavalier 6cc y Lumina todos los modelos. ",
    "PRECIO": "16115.781895478"
  },
  {
    "CODIGO": "103-5510",
    "DESCRIPCION": "Base De Motor Derecha Chevrolet Aveo 1.6 Modelo 2005-2015 (R nueva)",
    "PRECIO": "41454.504"
  },
  {
    "CODIGO": "103-5499",
    "DESCRIPCION": "Base De Motor Izquierda Chevrolet Aveo 1.6 Modelo 2005-2015 (L nueva)",
    "PRECIO": "41454.504"
  },
  {
    "CODIGO": "103-7M121",
    "DESCRIPCION": "Base de Caja Izquierda Ford Fiesta Power, Max, Move 1,6 y Ecosport. Modelo 2004/2012",
    "PRECIO": "48484.8"
  },
  {
    "CODIGO": "103-0234",
    "DESCRIPCION": "Inserto de Recambio para la Base de Caja Izquierda Chevrolet Optra 1.8. Todos los modelos",
    "PRECIO": "29257.1136"
  }

       ];
       */

}
  onDeleteBuje(idBuje){
    const confirmar=confirm("Estas seguro que deseas Eliminar este Jugador?");
    if(confirmar)
    {
      this.baService.deleteBuje(idBuje);
    }
    
  }

  onPreUpdateBuje(buje:BujeInterface){

    this.baService.bujeSeleccionado=buje;
  }


  public downloadPdf(){
    let doc=new jsPDF();
    let specialElementHandlers={
      '#editor':function(element,renderer){
        return true;
      }
    };
    let datatable=this.table.nativeElement;
    doc.fromHTML(datatable.innerHTML,15,15,{
      'width':190,
      'elementHandlers':specialElementHandlers
    });
    doc.save('prueba.pdf');

  }



public captureScreen()
{
var data = document.getElementById('datatable');
html2canvas(data).then(canvas => {
// Few necessary setting options
var imgWidth = 208;
var pageHeight = 295;
var imgHeight = canvas.height * imgWidth / canvas.width;
var heightLeft = imgHeight;
 
const contentDataURL = canvas.toDataURL('image/jpg')
let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
var position = 0;
pdf.addImage(contentDataURL, 'jpg', 0, position, imgWidth, imgHeight)
pdf.save('MYPdf.pdf'); // Generated PDF
}); 
}

time = new Observable(observer => {
    setInterval(() => observer.next(new Date().toString()), 1000)
  });

}

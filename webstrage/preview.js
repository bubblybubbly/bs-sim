//職業技能p、趣味技能pで管理をまとめるため　グローバルに連想配列を作る
var hash = {
    "言いくるめ": 5,
    "医学": 5,
    "運転": 20,
    "応急手当": 30,
    "オカルト": 5,
    "回避": 0,
    "化学": 1,
    "鍵開け": 1,
    "隠す": 15,
    "隠れる": 10,
    "機械修理": 20,
    "聞き耳": 25,
    "キック": 25,
    "クトゥルフ神話": 0,
    "組みつき": 25,
    "芸術": 5,
    "経理": 10,
    "拳銃": 20,
    "考古学": 1,
    "こぶし/パンチ": 50,
    "コンピュータ": 1,
    "サブマシンガン": 15,
    "忍び歩き": 10,
    "写真術": 10,
    "重機械操作": 1,
    "乗馬": 5,
    "ショットガン": 30,
    "信用": 15,
    "心理学": 5,
    "人類学": 1,
    "水泳": 25,
    "製作": 5,
    "精神分析": 1,
    "生物学": 1,
    "説得": 15,
    "操縦": 1,
    "地質学": 1,
    "跳躍": 25,
    "追跡": 25,
    "頭突き": 10,
    "電気修理": 10,
    "電子工学": 1,
    "天文学": 1,
    "投擲": 25,
    "登攀": 40,
    "図書館": 25,
    "ナビゲート": 10,
    "値切り": 5,
    "博物学": 10,
    "物理学": 1,
    "変装": 1,
    "法律": 5,
    "ほかの言語": 1,
    "母国語": 0,
    "マーシャルアーツ": 1

};

for (key in hash) {
    if (key == "博物学") {
      //  alert(key + "の初期値は" + hash[key] + "だよ");
    }
}
//エンジニア	化学,機械修理,重機械操作,地質学,図書館,物理学,趣味
//医師	医学,応急手当,信用,心理学,精神分析,生物学,ラテン語,薬学,趣味

var val = 0; //技能値表示
//差分（現在技能ち-初期技能ち）の変数
var sabun = 0;
//EDU*20の降っていない状態の職業技能P 今は仮に300
var shoki_shoku_p = 300;
var job_P = 114514;
var pro_skill_memo=[];
// ①Web Storageの実装確認
if (typeof localStorage === 'undefined') {
    window.alert("このブラウザはWeb Storage機能が実装されていません");
} else {
    //	window.alert("このブラウザはWeb Storage機能を実装しています");

    var storage = localStorage;

    // ③localStorageへの格納
    function setlocalStorage() {
        var key = document.getElementById("textkey").value;
        var value = document.getElementById("textdata").value;

        // 値の入力チェック
        if (key && value) {
            storage.setItem(key, value);
        }

        // 変数の初期化
        key = "";
        value = "";

        viewStorage();
    }

    // ③localStorageからのデータの取得と表示
    function job_skill_show() {

        // localStorageすべての情報の取得
        for (var i = 0; i < storage.length; i++) {
            var _key = storage.key(i);
            var value = storage.getItem(_key);
            var job_name = document.getElementById("job").value;
            console.log(_key);
            console.log(value);
            console.log(job_name);
            if (job_name === _key) {
                console.log("一致");
                show(value);
            }
        }
    }

    function changeValue(value, val) {
        //id valの要素は各技能のpの変更前のスライド値
        //value は各技能のpの変更後の表示値
        //sabunは変量を保存する変数
        //izenは変化前のスライド値を保存する変数
        sabun = document.getElementById(val).innerHTML - value;
        var izen = document.getElementById(val).innerHTML;

        //sは職業pのスライド値、tは職業pの表示値
        var s = document.getElementById("slide").value;
        var t = document.getElementById(job_P).innerHTML;

        //変化後のスライド値がふになる場合、スライドの最小値が0なので別処理
        if (Number(t) + Number(sabun) < 0) {
            //  alert('割り振れるポイントが超過しました')
            //職業pの表示値を0に
            document.getElementById(job_P).innerHTML = 0;
            //職業pのスライド値を0に
            document.getElementById("slide").value = 0;
            //各技能pのスライド値にsabunを可能な限り振る
            document.getElementById(val).innerHTML = Number(izen) + Number(s);
            //各技能pの表示値もスライド値と同じ値に
            value = Number(izen) + Number(s);
            //各技能pのスライド値と表示値が一致しないのでconsole.log
            var temp = val
            var temp_slide = "slide" + val;
            console.log(temp_slide);
            console.log("職業pのスライド値　" + document.getElementById("slide").value);
            console.log("各技能pのスライド値 " + document.getElementById(temp_slide).value);
            console.log("各技能pの表示値　" + value);
            document.getElementById(temp_slide).value = value;
            console.log("各技能pのスライド値 " + document.getElementById(temp_slide).value);

        } else {
            //変化後のスライド値が正の場合は問題ないのでそのまま

            //各技能のスライドpを各技能の表示と一致させる、
            document.getElementById(val).innerHTML = value;

            //職業pの表示値にsabunをたす
            document.getElementById(job_P).innerHTML = Number(t) + Number(sabun);
            //職業pのスライド値にsabunをたす
            document.getElementById("slide").value = Number(s) + Number(sabun);
            //現在の職業pのスライド値を表示
            console.log(document.getElementById("slide").value);
        }
    }
    //職業自由選択技能を出す
    function free_show() {
        //alert("yes");
        console.log("free_show yes");
        var xjob = document.getElementById("job_hobby").value;
        console.log(xjob);
        //職業選択技能に含まれていないかチェック
        for(var i=0;i<pro_skill_memo.length ;i++){
          if(pro_skill_memo[i]==xjob){
            alert("すでに職業技能にある技能です。");
            return;
          }
        }
        for (key in hash) {
            if (key == xjob) {
                //alert(key + "の初期値は" + hash[key] +"だよ");
                shoki = hash[key];
            }
        }
        document.getElementById('free_var').innerHTML = ' <input type="range" name="num" id = "slide' + val + '" min=' + shoki + ' max="100" step="1" value=' + shoki + ' onchange="changeValue(this.value,' + val + ')"> <span id="' +
            val + '">' + shoki + '</span>' + '<br>';
    }

    //職業選択技能を出す
    function show(x) {
        var cnt = 0;
        for (var i = 0; i < x.length - 1; i++) {
            if (x[i] == ",") cnt++;
        }
        var s = x.split(",");
        var str = '';

        for (var i = 0; i <= cnt; i++) {
            val = i;
            var shoki = 0;
            //初期値検索

            //s[i]が趣味の場合入力フォームで更新
            if (s[i] == "趣味") {
                str += '<input type="text" id = "job_hobby" value="" placeholder="職業選択技能" onChange="free_show()">' + '<div id="free_var"></div>';

            } else {
                //hash配列から初期値の取得
                for (key in hash) {
                    if (key == s[i]) {
                        //職業自由選択技能とかぶらないか後で確認するため保存
                        pro_skill_memo.push(s[i]);
                        //alert(key + "の初期値は" + hash[key] +"だよ");
                        shoki = hash[key];
                    }
                }

                str += s[i] + ' <input type="range" name="num" id = "slide' + val + '" min=' + shoki + ' max="100" step="1" value=' + shoki + ' onchange="changeValue(this.value,' + val + ')"> <span id="' + val + '">' + shoki +
                    '</span>' + '<br>';

            }

        }

        str += "<br>"

        str += "職業技能P" + ' <input type="range" disabled id = "slide" min="0" max="400" step="1" value=' + shoki_shoku_p + '> <span id=' + job_P + '>' + shoki_shoku_p + '</span>' + '<br>';
        document.getElementById("preview").innerHTML = str;

    }



    // ④localStorageから削除
    function removeStorage() {
        var key = document.getElementById("textkey").value;

        storage.removeItem(key);

        // 変数の初期化
        key = "";

        viewStorage();
    }

    // ⑤localStorageからすべて削除
    function removeallStorage() {
        if (window.confirm("今までの記録を全て削除します。よろしいですか？")) {
            storage.clear();
            viewStorage();
        }
    }

}

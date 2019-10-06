
/*-- .jsファイルの名前を変えた場合は、htmlの下のほうのパスの書き換えだけでOKです。 --*/

/*------------------------------
  グローバルブロック ここから
-------------------------------*/

/* ---- 関数の窓口 ---- */

//let funcFreeA; // keyBoard.js キーボード「8」で呼び出し。

let trickA_1_Down; // 逆さまオバケの画像を下に下げてくる関数。 チートキー「」
let trickA_2_Down; // コピー生産。 チートキー「 d 」
let a1Up; // 逆さまオバケの画像を上に上げる関数。 チートキー「」
let a2Up; // コピー生産。 チートキー「 u 」

let answer_esc; // 逆さまオバケ撃退チェック関数
let answer_Ins; // 逆さまオバケ撃退チェック関数
let answer_v; // 逆さまオバケ撃退チェック関数

// 外部からの関数を呼び出しを受け止めるために
// 関数の名前だけグローバルで宣言しておく。
// 関数の本体はローカルの中 ↓↓

/*--------------------------------
  グローバルブロック ここまで
---------------------------------*/


/*------------------------------
　ローカルブロックここから
-------------------------------*/
document.addEventListener('DOMContentLoaded',
  function () {
    'use strict';

    /*--------------
     ローカル変数宣言
    --------------*/

    //let num; // B も C もローカルで 変数num を宣言しているが、エラーにはならない。

    let trickA_1Img = document.querySelector('#trickA_1');
    let trickA_2Img = document.querySelector('#trickA_2'); // コピー生産
    // 宣言と同時に要素格納。
    //console.log(trickA_1Img.width); // 画面に表示されるときの大きさ。 数値なので＋－×÷算ができる。
    //console.log(trickA_1Img.height); // 画面に表示されるときの大きさ。 数値なので＋－×÷算ができる。
    
    //console.log(trickA_1Img.naturalWidth); // 元の画像のヨコ幅 数値なので＋－×÷算ができる。
    //console.log(trickA_1Img.naturalHeight); // 元の画像のタテ幅 数値なので＋－×÷算ができる。
    
    //console.log(trickA_1Img.style.left); // 画像の左上端のx座標 「～～px」という文字列なので、計算には使えない。
    //console.log(trickA_1Img.style.top); // 画像の左上端のy座標「～～px」という文字列なので、計算には使えない。
    //trickA_1Img.style.left = 数値 + 'px';
    //trickA_1Img.style.top = 数値 + 'px';
    //の形で座標を動かせる。
    // 座標は、ページロード時は値を得られないが、座標を動かすと値を得られる模様。

    const trickA_1_width = 400; // 逆さまオバケ trickA_1 をどれくらいの大きさで表示させるか。横幅基準で。
    const trickA_1_height = trickA_1_width*(trickA_1Img.naturalWidth/trickA_1Img.naturalHeight);// その場合の縦幅を計算。

    const trickA_2_width = 300; // コピー生産
    const trickA_2_height = trickA_2_width*(trickA_2Img.naturalWidth/trickA_2Img.naturalHeight);// コピー生産

    // 画像の要素に適用する。
    trickA_1Img.width = trickA_1_width;
    trickA_1Img.height = trickA_1_height;
    //console.log(trickA_1Img.width);
    //console.log(trickA_1Img.height);
    trickA_2Img.width = trickA_2_width; // コピー
    trickA_2Img.height = trickA_2_height; // コピー

    trickA_1Img.style.left = ( frameWidth/2 - trickA_1Img.width/2 ) + 'px';
    // 逆さまオバケの画像を左右の真ん中に配置。
    trickA_2Img.style.left = ( frameWidth/2 - trickA_2Img.width/2 ) + 'px'; // コピー


    trickA_1Img.style.top = -1*(trickA_1Img.height) + 'px'; 
    // 逆さまオバケの画像を500x500フレームの上の画面外に配置。
    trickA_2Img.style.top = -1*(trickA_2Img.height) + 'px'; 

    let text_esc = document.querySelector('#key__esc'); // 画面表示のテキスト要素を格納
    let text_Ins = document.querySelector('#key__Ins'); // 画面表示のテキスト要素を格納
    let text_v = document.querySelector('#key__v'); // 画面表示のテキスト要素を格納

    // 答え格納用。３つのうちのどれかが true を持つ。
    let esc;
    let Ins;
    let v; 

    let A1Y = -1*(trickA_1Img.height); // 逆さまオバケのy座標の計算に使う。初期値 = 画像の縦幅。上の画面外ピッタリにいる。
    let A2Y = -1*(trickA_2Img.height); // 逆さまオバケのy座標の計算に使う。初期値 = 画像の縦幅。上の画面外ピッタリにいる。
    let timer;

    let a1Down; // 関数。オバケを登場させる動き
    // let a1Up; // オバケを上に上げる動き 関数の窓口に引っ越し
    let a2Down; // 関数。オバケを登場させる動き

    /*--------------
      ローカル関数
    --------------*/


    trickA_1_Down = () => {

      // A1Yはローカル変数宣言で宣言＋代入。timerも変数宣言で宣言
      a1Down = () => {

        A1Y += 30; // どれくらいの速さで画像を下ろすか。

        trickA_1Img.style.top = A1Y +'px';
        timer = setTimeout( a1Down , 20);

        if (A1Y >= -10){ // 限界値以上だったら
        A1Y = -10; // 限界値を代入しとけ、の意
        clearTimeout(timer);
        } // if文の閉じ

      } // a1Down の閉じ
      a1Down();



      let randomA_1 = Math.floor(Math.random()*3);
      // 0 ～ 1 の小数をランダムで取得、３倍＆小数部分切り捨てで 0 ～ 3 の数字に。
      // 3 はまず出ない？

      switch(randomA_1){

        case 0 :
        esc = true;
        Ins = false;
        v = false;
        text_esc.style.display = 'block'; // テキストを表示させる。
        break;

        case 1 :
        esc = false;
        Ins = true;
        v = false;
        text_Ins.style.display = 'block'; // テキストを表示させる。
        break;

        case 3 : // 3ってあるんだろうか・・・？この位置に置くと２の処理をする。
        case 2 :
        esc = false;
        Ins = false;
        v = true;
        text_v.style.display = 'block'; // テキストを表示させる。
        break;

      } // switch の閉じ

    } //trickA_1_Down の閉じ


    trickA_2_Down = () => {

      // A1Yはローカル変数宣言で宣言＋代入。timerも変数宣言で宣言
      a2Down = () => {

        A2Y += 30; // どれくらいの速さで画像を下ろすか。

        trickA_2Img.style.top = A2Y +'px';
        timer = setTimeout( a2Down , 20);

        if (A2Y >= -10){ // 限界値以上だったら
        A2Y = -10; // 限界値を代入しとけ、の意
        clearTimeout(timer);
        } // if文の閉じ

      } // a1Down の閉じ
      a2Down();



      let randomA_2 = Math.floor(Math.random()*3);
      // 0 ～ 1 の小数をランダムで取得、３倍＆小数部分切り捨てで 0 ～ 3 の数字に。
      // 3 はまず出ない？

      switch(randomA_2){

        case 0 :
        esc = true;
        Ins = false;
        v = false;
        text_esc.style.display = 'block'; // テキストを表示させる。
        break;

        case 1 :
        esc = false;
        Ins = true;
        v = false;
        text_Ins.style.display = 'block'; // テキストを表示させる。
        break;

        case 3 : // 3ってあるんだろうか・・・？この位置に置くと２の処理をする。
        case 2 :
        esc = false;
        Ins = false;
        v = true;
        text_v.style.display = 'block'; // テキストを表示させる。
        break;

      } // switch の閉じ

    } //trickA_2_Down の閉じ



    a1Up = () => { // 画像を上へ。この中は20ミリ秒ループ

      A1Y -= 20;
      trickA_1Img.style.top = A1Y +'px';
      timer = setTimeout( a1Up , 20);

      // 上がりきったら停止
      if (A1Y <= -1*(trickA_1Img.height)){ // 限界値以上だったら
      A1Y = -1*(trickA_1Img.height); // 限界値を代入しとけ、の意
      clearTimeout(timer);
      } // if文の閉じ

    } // a1Up の閉じ


    a2Up = () => { // 画像を上へ。この中は20ミリ秒ループ

      A2Y -= 20;
      trickA_2Img.style.top = A2Y +'px';
      timer = setTimeout( a2Up , 20);

      // 上がりきったら停止
      if (A2Y <= -1*(trickA_2Img.height)){ // 限界値以上だったら
      A2Y = -1*(trickA_2Img.height); // 限界値を代入しとけ、の意
      clearTimeout(timer);
      } // if文の閉じ

    } // a1Up の閉じ



    answer_esc = () =>{ // keyBoard.js から呼ばれる関数。関数の窓口設置済み
      if(esc === true){ // 変数 esc に true が入っているなら
      a1Up(); // 画像を上へ。元々上にいるなら動かない。
      a2Up(); // 画像を上へ。元々上にいるなら動かない。

      // 効果音、撃退エフェクト(パンチとか)の'block','none'処理はこのへん。

      text_esc.style.display = 'none'; // テキストを消す。
      }
    }

    answer_Ins = () =>{ // keyBoard.js から呼ばれる関数。関数の窓口設置済み
      if(Ins === true){ // 変数 Ins に true が入っているなら
      a1Up(); // 画像を上へ。元々上にいるなら動かない。
      a2Up(); // 画像を上へ。元々上にいるなら動かない。

      // 効果音、撃退エフェクト(パンチとか)の'block','none'処理はこのへん。

      text_Ins.style.display = 'none'; // テキストを消す。
      }
    }

    answer_v = () =>{ // keyBoard.js から呼ばれる関数。関数の窓口設置済み
      if(v === true){ // 変数 v に true が入っているなら
      a1Up(); // 画像を上へ。元々上にいるなら動かない。
      a2Up(); // 画像を上へ。元々上にいるなら動かない。

      // 効果音、撃退エフェクト(パンチとか)の'block','none'処理はこのへん。

      text_v.style.display = 'none'; // テキストを消す。
      }
    }
      // テキストを表示させるようにhtml,cssをいじる。
      // あのテキストの表示の仕方は、もっと上手い方法があると思う。


      /*--------------------------------------------
          ５号 「 画像のサイズ、縦横比に自由度を持たせる。 」
      ---------------------------------------------*/
      // 逆さまオバケの画像変更、違うオバケも逆さまで登場させることも予測して
      // どんな大きさ、縦横比の画像でも自動的に対応するように
      // 変数の式の形で表現し直す。
      // さて、どこから手を付けるか。

      // 1、用意した画像の横幅を入力できるようにし、
      // どれくらいの大きさで登場させるかを個別に設定できるようにする。

      // 2、逆さまの画像をどれくらいまで登場させるか(全身とは限らない)を
      // 個別に設定できるようにする。

    // 元サイズの横幅と縦幅の比を求める。
    
    // let trickA_1Img = document.querySelector('#trickA_1');
    // console.log(trickA_1Img.naturalWidth);
    // console.log(trickA_1Img.naturalHeight);
    
    // functions.js の enemySizeup();によると、Width/Heightらしい。
    
    // trickA_1Img.naturalWidth/trickA_1Img.naturalHeight

    // これに希望するサイズの横幅変数をかけると縦幅になる。

    // 「この横幅で表示したい」という数値(300でとか400でとか)を
    // let trickA_1_width;とすると
    // 縦幅は let trickA_1_height = trickA_1_width*(trickA_1Img.naturalWidth/trickA_1Img.naturalHeight);となる。

    // ２つの変数を画像の横幅に適用する。
    //trickA_1Img.width = trickA_1_width;
    //trickA_1Img.height = trickA_1_height;

    // これを変数宣言に貼っておく。
    // css のほうのwidth,heightを消せば機能する。
    // ここまで成功

    // 左右での真ん中に登場させる。

    // global.js に frameWidth という定数があるので持ってくる。中身は500。
    // 500x500のフレームの半分から画像の横幅の半分もどれば真ん中。
    // ( frameWidth/2 - trickA_1Img.width/2 )
    // 画像のx座標に代入。cssの記述は消しておく。
    // trickA_1Img.style.left = ( frameWidth/2 - trickA_1Img.width/2 ) + 'px'; 
    // 変数宣言に貼っておく。
    // 成功

    // 500x500フレームのすぐ上に待機させる。
    // 小さい画像ならy座標のマイナスも小さいが、大きい画像はマイナスも大きい。
    // trickA_1Img.style.top = -1*(trickA_1Img.height) + 'px';
    // 変数宣言に貼っておく。移動用変数 A1Y にも代入しておく。
    // 画像を上に上げる処理 a1Up(); の限界値もこの値。
    // 成功



      /*--------------------------------------------
          ６号 「 逆さまオバケ２ 」 の実装のタネを作っておく。
      ---------------------------------------------*/
    // たくさんの種類は実装しないと思うので、同じ処理をモジュールごとコピー。
    // 撃退部分は共用でいけると思う。
    // 画像の用意、html、css 設定
    // このファイルの上から順番に A_1 に併記していく。
    // 成功
    // 画像の差し替えなど、改造自由。



      /*----------------------------
          ７号 出現条件を設定する。
      ----------------------------*/
      // 800点
      // 1800点
      // 2800点
      // 3800点
      // 4800点

      // 高速ループで出現しまくることがないように、
      // 点数での敵の出現レベルと似た仕組みにする。
      // functions.js に書き込み
      // 機能してる。出現間隔をひろめに調整。



    // グローバルで宣言した関数の本定義
    //function = funcFreeA(){ // ← エラーになる。
    //funcFreeA = function(){ // ← この形は通る。
    //funcFreeA = () => {
      //console.log('keyBoard.js から freeSpaceA.js の');
      //console.log('ローカル関数[ funcFreeA ] が呼び出されました。');
    //}
    //console.log('呼ばれなくてもページロード直後に1度だけ処理されるもの : A');

  }, false); // DOMCon... の閉じ


/*------------------
    作業スペース
-------------------*/




/*-----------------------------
    ローカルブロックここまで
-----------------------------*/
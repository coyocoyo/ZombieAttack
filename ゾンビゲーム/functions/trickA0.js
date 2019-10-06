
/*-- .jsファイルの名前を変えた場合は、htmlの下のほうのパスの書き換えだけでOKです。 --*/

/*------------------------------
  グローバルブロック ここから
-------------------------------*/

/* ---- 関数の窓口 ---- */

//let funcFreeA; // keyBoard.js キーボード「8」で呼び出し。

//let trickA_1;

let trickA_1_Down; // 逆さまオバケの画像を下に下げてくる関数。 チートキー「 d 」
// let trickA_1_Up; // 逆さまオバケの画像を上に上げる関数。 チートキー「 u 」 使わなくなった。
let a1Up; // 逆さまオバケの画像を上に上げる関数。 チートキー「 u 」

let answer_esc; // 逆さまオバケ撃退チェック
let answer_Ins; // 逆さまオバケ撃退チェック
let answer_v; // 逆さまオバケ撃退チェック

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

    let text_esc = document.querySelector('#key__esc'); // 画面表示のテキスト要素を格納
    let text_Ins = document.querySelector('#key__Ins'); // 画面表示のテキスト要素を格納
    let text_v = document.querySelector('#key__v'); // 画面表示のテキスト要素を格納

    // 答え格納用
    let esc;
    let Ins;
    let v; 

    // let a1Down;
    let A1Y = -400;
    let timer;

    let a1Down; // オバケを登場させる動き
    let a1Up; // オバケを上に上げる動き


    /*--------------
      ローカル関数
    --------------*/

    //trickA_1 = () =>{
    trickA_1_Down = () => {

      /*---------------------
          基本の仕掛け１号
      -----------------------

      まずは、
      タテ(height):400px * ヨコ(width):400px、座標：フレームの上部(top:-400px)、真ん中(left:50px)
      と css で設定された画像を動かす。
      画像サイズ、縦横比に自動的に対応させる式は、一通りの仕掛けができてからにする。

      かにゲームの「牛」の動きを持ってくるか。
      どこまでも下に行ってしまう画像で一旦は成功とする。

      現在、オバケ画像のy座標はtop:-400px。

      let timer;
      timer = setTimeout( 関数 , 20); : [ 20ミリ秒後に関数を実行する。１回だけ。関数は();なしで記述 ]
      clearTimeout(timer); : [ timerの停止 ] を使う。

      trickA_1Img.style.top = 数値 +'px'; の形で動かす。

      数値を -400 から少しずつ増えるようにする。

      let A1Y = -400; を宣言、代入しておいて、

      関数 {
      A1Y += 3;
      trickA_1Img.style.top = A1Y +'px';
      timer = setTimeout( 関数 , 20);
      }
      こんな感じか。
      */ // -- 基本の仕掛け１号 -- のコメント閉じ
      
      /*
      // A1Yはローカル変数宣言で宣言＋代入。timerも変数宣言で宣言
      let a1Down = () => {
        A1Y += 3; // ちょっと遅い。
        trickA_1Img.style.top = A1Y +'px';
        timer = setTimeout( a1Down , 20);
      }
      a1Down(); // ホイスティングしなかったので、下に。
      // 成功
      */

      /*-----------------------
          基本の仕掛け１号完成
      ------------------------*/



      /*-----------------------
          基本の仕掛け２号
      ------------------------

      下に下がる動きを止める。

      A1Y　= 400で止める。 // ウソ　0

      if (A1Y >= 0){ // 限界値以上だったら
        A1Y = 0; // 限界値を代入しとけ、の意
        clearTimeout(timer); // 20秒毎の処理を止めておかないと、限界値を代入し続ける。
      }
      こんな感じか。

      */ // -- 基本の仕掛け２号 --　のコメント閉じ

      /*
      // A1Yはローカル変数宣言で宣言＋代入。timerも変数宣言で宣言
      let a1Down = () => {
        A1Y += 20;

        if (A1Y >= 0){ // 限界値以上だったら
        A1Y = 0; // 限界値を代入しとけ、の意
        clearTimeout(timer);
        // 20秒毎の処理を止めておかないと、限界値を代入し続ける。
        // これで止まる意味がよく分からない。変数timerにどういう処理をしているのか。
        } // if文の閉じ
        
        trickA_1Img.style.top = A1Y +'px';
        timer = setTimeout( a1Down , 20);
      } // a1Down の閉じ
      a1Down();
      // ホイスティングしなかったので、下に。
      // 親関数 trickA_1_Down が呼び出されたときに１度だけ処理される。(その先がループ)
      // 成功
      */

      /*-----------------------
          基本の仕掛け２号完成
      ------------------------*/



      /*-----------------------
          基本の仕掛け2.1号 
      ------------------------*/
      // 基本の仕掛け３号で問題が発覚したので少し変更。

      // A1Yはローカル変数宣言で宣言＋代入。timerも変数宣言で宣言
      a1Down = () => {

        A1Y += 20;

        trickA_1Img.style.top = A1Y +'px';
        timer = setTimeout( a1Down , 20);

        // clearTimeout を setTimeout より下に。
        // 人間には分からない時間感覚だが、
        // setTimeoutの20ミリ秒の発火のカウント中にclearTimeoutの処理が行われ、
        // setTimeout のカウントダウンが止まる。
        // clear が上で set が下だと機能しない。当たり前か。
        // JavaScriptはシングルスレッド処理と言われているが、
        // 後回し処理みたいなことはするらしく、
        // setTimeoutの20ミリ秒の間、何もしないというわけではないらしい。

        if (A1Y >= 0){ // 限界値以上だったら
        A1Y = 0; // 限界値を代入しとけ、の意
        clearTimeout(timer);
        // 20秒毎の処理を止めておかないと、限界値を代入し続ける。
        } // if文の閉じ

      } // a1Down の閉じ
      a1Down();
      // 2.1 として成功

      /*-----------------------
          基本の仕掛け2.1号完成
      ------------------------*/

      // 基本の仕掛け４号より引っ越し
      let randomA_1 = Math.floor(Math.random()*3);
      // 大体、0 ～ 2 という数字が得られるはず。
      // 3 はまずないでしょう。

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

      } // switch の閉じ　引っ越しここまで

      //trickA_1Img.style.left = 50 + 'px';
      //trickA_1Img.style.top = 0 +'px';
      //console.log(trickA_1Img.style.left); 
      //console.log(trickA_1Img.style.top);


    // } trickA_1 の閉じ
    // } // trickA_1ImgDown の閉じ
    } //trickA_1_Down の閉じ






    //trickA_1_Up = () => {

      /*------------------------------------
          基本の仕掛け３号 ( 画像を上にあげる。 )
      -------------------------------------

      // trickA_1_Down(); の基本の仕掛け２号をコピペ、改造で。

      let a1Up = () => {
        A1Y -= 20;

        if (A1Y <= -400){ // 限界値以上だったら
        A1Y = -400; // 限界値を代入しとけ、の意
        clearTimeout(timer);
        // 20秒毎の処理を止めておかないと、限界値を代入し続ける。
        // これで止まる意味がよく分からない。変数timerにどういう処理をしているのか。
        } // if文の閉じ
        
        trickA_1Img.style.top = A1Y +'px';
        timer = setTimeout( a1Up , 20);
      } // a1Up の閉じ
      a1Up(); // ホイスティングしなかったので、下に。
      // 失敗。 a1Downも同時に機能してるのか、ガクガクする。
      // ２号を改善しにいく。

      */ // ---- 基本の仕掛け３号のコメント閉じ ----

      /*------------------------------------
          基本の仕掛け3.1号 ( 画像を上にあげる。 )
      -------------------------------------*/
      // 基本の仕掛け2.1号の成功に合わせて3号も変更

      a1Up = () => {
        A1Y -= 20;

        trickA_1Img.style.top = A1Y +'px';
        timer = setTimeout( a1Up , 20);

        if (A1Y <= -400){ // 限界値以上だったら
        A1Y = -400; // 限界値を代入しとけ、の意
        clearTimeout(timer);
        // 20秒毎の処理を止めておかないと、限界値を代入し続ける。
        // これで止まる意味がよく分からない。変数timerにどういう処理をしているのか。
        // 分かった。超高速カウントをストップさせてると思う。
        } // if文の閉じ

      } // a1Up の閉じ
      // a1Up(); // ホイスティングしなかったので、下に。
      // 成功。チートキー 「 d 」 「 u 」 で快調に上げ下げする。

    // } // trickA_1_Up の閉じ 必要のないくくりだった。



      /*---------------------------------------
          基本の仕掛け４号 「 逆さまオバケを追い払う。 」
      ----------------------------------------*/

      // 射撃ではなく、出て来たときに指定されたキーを押して追い払う、という仕掛けを考えている。

      // esc = Escape
      // Ins = Insert
      // Alt = Alt
      // @ = @

      // keyBoard.js から押されたキーについての報告を受け取る。
      // 関数呼び出しの形で報告を受け取る。

      // answer_esc
      // answer_Ins
      // answer_Alt
      // という関数名を窓口に設置

      /*
      answer_esc = () =>{
        console.log('escが押されました。');
      }

      answer_Ins = () =>{
        console.log('Insが押されました。');
      }

      answer_v = () =>{
        console.log('vが押されました。');
      }
      */
      // 入力・呼び出しチェック。成功
      // Alt はあまりよくない。押すとフォーカスが外れる？１回しか受け付けない。
      // 「 v 」 に変更

      // 逆さまオバケが出現したときのタイミングでランダムを行い、
      // ３つの変数のうちのどれか１つに'true'みたいな値を持たせ、
      // 他の２つは'false'みたいな値を持たせてみてはどうか。
      

      /* // -- オバケを出す時の処理なので引っ越しさせる --
      let randomA_1 = Math.floor(Math.random()*3);
      // 大体、0 ～ 2 という数字が得られるはず。
      // 3 はまずないでしょう。

      let esc;
      let Ins;
      let v; 

      switch(randomA_1){

        case 0 :
        esc = true;
        Ins = false;
        v = false;
        text_esc.style.display = 'block'; // 「esc」を押せ！のテキストを表示させる。
        break;

        case 1 :
        esc = false;
        Ins = true;
        v = false;
        text_Ins.style.display = 'block'; // 「Ins」を押せ！のテキストを表示させる。
        break;

        case 3 : // 3ってあるんだろうか・・・？この位置に置くと２の処理をする。
        case 2 :
        esc = false;
        Ins = false;
        v = true;
        text_v.style.display = 'block'; // 「 v 」を押せ！のテキストを表示させる。
        break;

      }
      */ // オバケ出現ブロックに引っ越し


      // true,falseの仕掛けを組み込んでみる。
      answer_esc = () =>{ // keyBoard.js から呼ばれる関数。関数の窓口設置済み
        //console.log('escが押されました。');
        if(esc === true){ // 変数 esc に true が入っているなら
        a1Up(); // 撃退
        text_esc.style.display = 'none'; // テキストを消す。
        }
      }

      answer_Ins = () =>{ // keyBoard.js から呼ばれる関数。関数の窓口設置済み
        //console.log('Insが押されました。'); // テキストを消す。
        if(Ins === true){ // 変数 Ins に true が入っているなら
        a1Up(); // 撃退
        text_Ins.style.display = 'none'; // テキストを消す。
        }
      }

      answer_v = () =>{ // keyBoard.js から呼ばれる関数。関数の窓口設置済み
        //console.log('vが押されました。');
        if(v === true){ // 変数 v に true が入っているなら
        a1Up(); // 撃退
        text_v.style.display = 'none'; // テキストを消す。
        }
      }
      // テキストを表示させるようにhtml,cssをいじる。
      // あのテキストの表示の仕方は、もっと上手い方法があると思う。
      // とりあえず、ここまで成功
      /*--------------------------------------------
          基本の仕掛け４号 「 逆さまオバケを追い払う。 」 完成
      ---------------------------------------------*/



      /*--------------------------------------------
          ５号 「 画像のサイズ、縦横比に自由度を持たせる。 」
      ---------------------------------------------*/
      // 逆さまオバケの画像変更、違うオバケも逆さまで登場させることも予測して
      // どんな大きさ、縦横比の画像でも自動的に対応するように
      // 変数の式の形で表現し直す。

      // コメントばっかりで、アクティブになってる行が飛び飛びで見づらくなってきたので、
      // このファイルをtrickA0.jsと改名し、trickA.jsを改めて新しい作業スペースとする。
      // この.jsファイルはhtmlにはリンクさせない。



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
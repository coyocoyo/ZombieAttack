
/*---------------------------------------
        マウス移動、初期配置、再配置、
        自機からの攻撃当たり判定
          (座標が関係してくるもの)
          大きくなり過ぎてる印象あり。
          分離できんものか。
-----------------------------------------*/

/*---------------------------
　　　　グローバルブロックここから
---------------------------*/
let popEnemyA; // functions.js からの呼び出しあり。
let setEnemies; // keyBoard.jsからの呼び出しあり。
let setTarget; // functions.js からの呼び出しあり。
let setPlayer; // keyBoard.js,functions.js,weapon.js からの呼び出しあり。
let setBgimg; // keyBoard.jsからのテスト呼び出し。
let removeEnemy; // function.js から呼び出されてる。
let removeTarget; // weapon.js から呼び出される。
let removePlayer; // weapon.js から呼び出される。
let hitJudge; // weapon.js から呼び出される。
// 他のjsファイルからの関数呼び出しリクエストを受け止めるために
// ローカルにある関数の'名前だけ'グローバルで宣言しておく。

/*---------------------------
　　　　グローバルブロックここまで
---------------------------*/



/*------------------------------------------------
　　　　            ローカルブロックここから
 ここで宣言した変数は、他のjs.ファイルからは読み込まれない。
 変数の命名が自由だとも言える。
--------------------------------------------------*/



document.addEventListener('DOMContentLoaded',
  function () {
    'use strict';

    //-------  ローカル変数  -------------

    let bgimgX; // 背景の x 座標を格納する。
    let bgimgY; // 背景の y 座標を格納する。


    // マウス移動による各画像の移動に使ってる。

    let targetX;　// 照準の x 座標 
    let targetY; // 照準の y 座標
    // let target;  // 照準の width , height を取得するときに使ってる。
    // ゲームスタート時の「Enter」 → setTaget();呼び出しの時に要素が取得される。
    // setTarget()の記述を増やせば武器の変更、照準画像、範囲の切り替えは難しくない。
    // setTarget()は照準画像の寸法に合わせて自動的に真ん中やや上の座標に設置される。

    let playerX;　// 主人公画像の x 座標 
    let playerY; // 主人公画像の y 座標


    //let enemyAX = []; // Aタイプの敵機の各x座標
    //let enemyAY = []; // Aタイプの敵機の各y座標
    // let enemyA = []; // Aタイプの敵機の要素取得用。
    // functions.jsも使ってるのでグローバルに置いてみたが、別個に同名の変数を宣言しても問題ない。

    let eRealLife = [];
    // 動いてる敵機の実際の残り耐久力を入れておく。

    let Xrate, Yrate;// 敵機の初期配置、再配置のときのランダム計算で使ってる

    let Hit0; // 命中エフェクト画像の要素格納用
    Hit0 = document.querySelector('#Hit0'); // 格納しておく。ページロード時に格納ざれる。

    let HitX; // 命中エフェクトの x 座標の数値を格納する　ページロード時はcssで-500
    let HitY; // 命中エフェクトの y 座標の数値を格納する ページロード時はcssで-500

    let stopper2 = 0; // 命中画像の動き制御。 初期値 0
    let timer2; // マウスクリックの当たり判定処理で使ってる。 200ミリ秒後に命中エフェクトを待機位置に移す。

    let explosion; // 要素格納用
    explosion = document.querySelector('#explosion'); // 格納しておく。ページロード時に格納される。

    let explosionX; // 爆発画像の x 座標の数値を格納する。　ページロード時はcssで-500
    let explosionY; // 爆発画像の y 座標を数値を格納する。 ページロード時はcssで-500
    let stopper1 = 0;
    // 爆発画像の動き制御。 初期値 0
    // 0 なら爆発は動かない。1なら動く。
    // マウス移動で常時使ってるが、当たり判定からも操作される。
    let timer1; // マウスクリックの当たり判定処理で使ってる。 1000ミリ秒後に爆発エフェクトを待機位置に移す。

    let beforeX, beforeY, afterX, afterY; // マウス移動計算用変数
    let diffX = 0;
    let diffY = 0;
    let posX, posY;

    let s; // 画面表示のScore要素を格納する。
    s = document.querySelector('#score'); // 格納しておく。ページロード時に格納される。

    let mouseShoot;
    // クリックイベントから外の.jsファイルの関数を呼び出せなかった。
    // mouseShootを呼んで、そこから shoot.js の shoot(); を呼び出す。

    /*---------------------------------------
            外部から呼ばれる関数の本定義
    ----------------------------------------*/

    /*--------------------------
             当たり判定
    --------------------------*/

    hitJudge = () =>{
      for (let i = firstE; i < lastE; i++) {
        //enemyA[i] = document.querySelector("#enemyA" + i);
        // ゲームスタート時に配列内の全要素が取得されてる。 
        //console.log(enemyA[i].style.width); // 機能してる
        //console.log(enemyA[i].style.height); // 機能してる
        // 元サイズではなく、その時点での縮小サイズ
        // 小数を含む値だと比べるのに都合が悪いんだろうか？
        // ログをよく見ると単位'px'がついてる。 ＝ 数値ではなく文字列なので、数値との大小比較はできない。

        if ( // x座標の判定
          ((targetX + target.width) >= enemyAX[i])
          &&
          (enemyAX[i] + enemySizeA[i]) >= targetX) {
          // x座標で当たっているなら下の処理に行く。外れているならif文を抜ける。
          if ( //y座標の判定
            (targetY + target.height) >= enemyAY[i]
            &&
            (enemyAY[i] + enemySizeA[i] / (enemyA[i].naturalWidth / enemyA[i].naturalHeight)) >= (targetY)
            ) {
            // console.log('座標 ' + enemyAX[i] +',' + enemyAY[i] +' にて enemyA' +i +' に当たり判定');

            soundHit1(); // audio.jsの関数呼び出し
            // 命中エフェクト画像を持ってくる
            HitX = (enemyAX[i] + enemySizeA[i] / 4); // その時の敵機の座標 - ザックリ調整
            HitY = (enemyAY[i] + enemySizeA[i] / 4); // その時の敵機の座標 - ザックリ調整
            // Hit = document.querySelector('#Hit'); // ページロード時に要素格納済み。変数宣言で。
            Hit0.style.left = HitX + 'px';
            Hit0.style.top = HitY + 'px';
            stopper2 = 1; // この時だけ命中エフェクトも動く
            timer2 = setTimeout(remove2, 200); // 0.2秒後に remove2(); を呼ぶ。 
            eRealLife[i]--; // i番の敵機の耐久力－１

            if (eRealLife[i] === 0) { // もし、i番の敵機の耐久力が0ならば

              // 爆発
              soundDestroy1(); // audio.jsの呼び出し
              score += eScore[i];
              // 敵毎にもらえる点数を個別に設定してる。
              // enemySizeA[i]がスコープ的にまだ有効なので
              // 記述を 「 score = eScore[i] - enemySizeA[i] 」 にすると
              // 「 敵が小さいうちに倒すと高得点 」 にできる。実装はしていない。

              //s = document.querySelector('score'); // ページロード時に要素格納済み。変数宣言で。
              //console.log(score);
              //s = document.querySelector('#score');
              s.textContent = 'Score：' + score + '点'; // sの要素はページロード時に格納済み
              // 爆発画像を持ってくる
              explosionX = (enemyAX[i] - enemySizeA[i] / 2); // その時の敵機の座標 - ザックリ調整
              explosionY = (enemyAY[i] - enemySizeA[i] / 2); // その時の敵機の座標 - ザックリ調整
              popEnemyA(i); // i の値をそのまま引数にしてpopEnemy呼び出し
              //explosion = document.querySelector('#explosion');　// 変数宣言で要素格納済み。
              explosion.style.left = explosionX + 'px';
              explosion.style.top = explosionY + 'px';
              stopper1 = 1; // この時だけ爆発も動く
              timer1 = setTimeout(remove1, 1000); // 1秒後に remove() へ

            } // if文の閉じ
            break; // 当たり判定があったらfor文を抜ける。
            // for文を全巡回させると１発の弾が全部の敵を貫通する。
            // 番号の小さい敵から当たることになるが。

          } // y座標の当たり処理の閉じ。 yで外れてるならここにくる
        } // x座標の当たり処理の閉じ。 xで外れてるならここにくる
      } // for文の閉じ
    } // hitJudge の閉じ

    /*--------------------------
          当たり判定ここまで
   --------------------------*/

    /*------------------------
    使わない敵機を待機位置に移す
     ------------------------*/

    removeEnemy = (i) => {
      //enemyA[i] = document.querySelector('#enemyA' + i);
      // ページロード時に全要素がすでに格納されてる。 global.js での宣言時に。
      enemySizeA[i] = 10;
      enemyA[i].style.width = enemySizeA[i] + 'px';
      enemyA[i].style.height = enemySizeA[i]/(enemyA[i].naturalWidth/enemyA[i].naturalHeight) + 'px';
      // 画像縮小
      enemyA[i].style.left = 1 + 'px';
      enemyA[i].style.top = 1 + 'px';
      enemyA[i].style.display = 'none';
    }



    /*------------------------------------------
      popEnemy(i) 敵画像の500x500フレーム内配置
    -------------------------------------------*/
    popEnemyA = (i) => {

      // console.log(i); // 呼び出し元の i はスコープが切れてるが、1とか2とか正しく出る。

      // while文でランダム取得のやり直しを設定していたが、挙動がおかしくなってきたので作り直し。
      // 違うところの記述ミスが原因だった・・・。
      let leftLimit = 30;
      let rightLimit = 70;

      Xrate = Math.floor(Math.random() * 100);
      //console.log(Xrate);
      if ( Xrate <= leftLimit ){ // 30以下(左過ぎて照準が届かない)なら
      Xrate = leftLimit; // 30にしとけ、の意
      } else if ( Xrate >= rightLimit ){ // 70以上(右過ぎて照準が届かない)なら
      Xrate = rightLimit; // 70にしとけ、の意
      } // if文の閉じ

      posX = Math.floor(bgimg.width / 100 * Xrate) + bgimgX;// x座標決定
      enemyAX[i] = posX;// 代入

      let topLimit = 60;
      let bottomLimit = 70;

      Yrate = Math.floor(Math.random() * 100);
      if ( Yrate <= topLimit ){ // 60以下(上過ぎて照準が届かない)なら
        Yrate = topLimit; // 60にしとけ、の意
      } else if ( Yrate >= bottomLimit ){ // 70以上(下過ぎて照準が届かない)なら
        Yrate = bottomLimit; // 70にしとけ、の意
      } // if文の閉じ

      posY = Math.floor(bgimg.height / 100 * Yrate) + bgimgY;// y座標決定
      enemyAY[i] = posY;// 代入

      //enemyA[i] = document.querySelector('#enemyA' + i);
      // ページロード時に全要素がすでに格納されてる。 global.js での宣言時に。
      enemyA[i].style.left = enemyAX[i] + 'px'; // 座標代入 この瞬間に敵機がワープする
      enemyA[i].style.top = enemyAY[i] + 'px'; // 座標代入 この瞬間に敵機がワープする

      // ポップした敵の大きさ代入
      enemySizeA[i] = 10; // 暫定的な設置なので要注意。 CSSでは10設定だった。
      enemyA[i].style.width = enemySizeA[i] + 'px';
      enemyA[i].style.height = enemySizeA[i] / (enemyA[i].naturalWidth / enemyA[i].naturalHeight) + 'px';
      //console.log(enemyA[i].style.width);
      //console.log(enemyA[i].style.height);

      // ポップした敵の耐久力代入
      eRealLife[i] = eDefaultLife[i];
      // 残り耐久力に初期値を代入。
      // 値だけが代入される。
      // Real が引き算されても Default は引き算されないらしい。
      // 参照を共有してるわけではないっぽい。
      enemyA[i].style.display = 'block';

    } // PopEnemyA の閉じ


    /*----------------------------------------------------------
              背景画像の真ん中をframeの真ん中に配置する。
    -----------------------------------------------------------*/
    setBgimg = () => {
      bgimg = document.querySelector('#bgimg' + 0);
      //console.log(bgimg.height); // 背景画像の縦幅
      //console.log(bgimg.width); // 背景画像の横幅

      // 背景画像の真ん中とフレームの真ん中を合わせた状態での
      // 背景画像の左上端の座標
      bgimgX = (frameWidth / 2) - (bgimg.width / 2);
      bgimgY = (frameHeight / 2) - (bgimg.height / 2);

      bgimg.style.left = bgimgX + 'px';
      bgimg.style.top = bgimgY + 'px';
      /*-- 真ん中処理ここまで --*/
    }

    /*--------------------------
            照準位置決定
        真ん中のやや上に配置する。
    ----------------------------*/
    setTarget = (i) => {
      target = document.querySelector('#targetScope' + i); // 0 番の武器の画像の要素を取得している。
      //console.log(target.height); // 照準画像の縦幅
      //console.log(target.width); // 照準画像の横幅
      // ゲームスタート時に必ず実行される処理。
      // ここで要素が取得される。

      targetX = (frameWidth / 2) - (target.width / 2) + 20;
      targetY = (frameHeight / 2) - (target.height / 2) - addY + 20;

      target.style.left = targetX + 'px';
      target.style.top = targetY + 'px';
      /*------ 照準位置決定ここまで ------*/
    }


    /*--------------------------
            主人公画像の設置
    ----------------------------*/
    setPlayer = (i) => {
      Player = document.querySelector('#Player_' + i); // i 番の主人公の画像の要素を取得。

      playerX = (frameWidth / 2) - (Player_Width / 2); // Player_Width → global.js の変数宣言参照。 
      playerY = (frameHeight) - (frameWidth*(Player.naturalWidth/Player.naturalHeight));

      Player.style.left = playerX + 'px';
      Player.style.top = playerY + 'px';
      Player.style.display = 'block';
    } // setPlayer の閉じ

    /*--------------------------
            プレイヤー画像撤去
    ----------------------------*/
    removePlayer = (i) => {
      let remove = document.querySelector('#Player_' + i);
      remove.style.display = 'none';
    } // removeTarget の閉じ



    /*------------------------
      敵機の初期配置、更新配置
    ------------------------*/
    setEnemies = () => {

      for (let i = 0; i < firstE; i++) {
        removeEnemy(i);
      } // for文の閉じ

      for (let i = firstE; i < lastE; i++) {
        popEnemyA(i);
      } // for文の閉じ

      for (let i = lastE; i < enemyA_Max; i++) {
        removeEnemy(i);
      } // for文の閉じ
    } // setEnemies の閉じ
    /*-------------
    -------------*/

    /*-------------------------------------
                マウス移動イベント
    --------------------------------------*/
    // マウスが1ピクセルでも動いたら呼び出される処理
    // ここより下は１秒間に50回以上の速さで繰り返される。
    document.onmousemove = function (e) {
      if (!e) e = window.event; //　IE互換用

      // マウスイベントが起きた瞬間のカーソルの座標を取得
      beforeX = e.screenX;
      beforeY = e.screenY;

      setTimeout(function () { // 20ミリ秒後に実行

        // マウスイベントが起きた瞬間から20ミリ秒後のカーソルの座標を取得
        afterX = e.screenX;
        afterY = e.screenY;


      }, interval); // setTimeout の閉じ

        // 引き算
        diffX = beforeX - afterX;
        diffY = beforeY - afterY;
        // diffX : マウスを右に動かすと正、左に動かすと負。 速めに動かすと 10~
        // diffY : マウスを下に動かすと正、上に動かすと負。 速めに動かすと 10~
        // マウスが動いた方向とおよその移動量が分かる。
        // 背景と敵機の爆発の３つに適用する。
        
        bgimgX += diffX * scrollrate; // 背景画像の仮のx座標
        bgimgY += diffY * scrollrate; // 背景画像の仮のy座標

        // x 座標の代入。 限界値を超えていたら限界値を代入。
        // 1回の処理で10px動くこともある。限界値を超えた値を代入させると面倒なことになる。
        if (bgimgX >= 0) {
          bgimgX = 0;
          bgimg.style.left = bgimgX + 'px';
        } else if ((frameWidth - bgimg.width) >= bgimgX) {
          bgimgX = (frameWidth - bgimg.width);
          bgimg.style.left = bgimgX + 'px';
        } else {
          bgimg.style.left = bgimgX + 'px';
        }

        // y 座標の代入。 限界値を超えていたら限界値を代入。
        if (bgimgY >= 0) {
          bgimgY = 0;
          bgimg.style.top = bgimgY + 'px';
        } else if ((frameHeight - bgimg.height) >= bgimgY) {
          bgimgY = (frameHeight - bgimg.height);
          bgimg.style.top = bgimgY + 'px';
        } else {
          bgimg.style.top = bgimgY + 'px';
        }

        // 敵機も一緒になって動く

        for (let i = firstE; i < lastE; i++) {

          if (bgimgX !== 0 && bgimgX !== (frameWidth - bgimg.width)) { // 背景が限界値なら動かない
            enemyA[i].style.left = (enemyAX[i] += diffX * scrollrate) + 'px';
          }

          //console.log(document.querySelector('#enemyA' +i ).style.left);

          if (bgimgY !== 0 && bgimgY !== (frameHeight - bgimg.height)) { // 背景が限界値なら動かない
            enemyA[i].style.top = (enemyAY[i] += diffY * scrollrate) + 'px';
          }

          //console.log(document.querySelector('#enemyA' +i ).style.top);

          // 命中エフェクトも一緒になって動く。が、普段は動かない。
          if (bgimgX !== 0 && bgimgX !== (frameWidth - bgimg.width)) {
            Hit0.style.left = (HitX += diffX * scrollrate * stopper2) + 'px';
          }

          if (bgimgY !== 0 && bgimgY !== (frameHeight - bgimg.height)) {
            Hit0.style.top = (HitY += diffY * scrollrate * stopper2) + 'px';
          }

          // 爆発も一緒になって動く。が、普段は動かない。
          if (bgimgX !== 0 && bgimgX !== (frameWidth - bgimg.width)) {
            explosion.style.left = (explosionX += diffX * scrollrate * stopper1) + 'px';
          }

          if (bgimgY !== 0 && bgimgY !== (frameHeight - bgimg.height)) {
            explosion.style.top = (explosionY += diffY * scrollrate * stopper1) + 'px';
          }

        } // for文の閉じ

    }; // onmousemoveの閉じ

    /*--------------------------------------
            マウスクリック
     ---------------------------------------*/

    mouseShoot = () => {
      shoot();
    }
    document.addEventListener('click', mouseShoot, false);
    // これだけ。　

    /*--------------------------------------
           マウスクリック ここまで
   ---------------------------------------*/



    /*----爆発画像を待機位置に移す
       -------*/
    function remove1() {
      stopper1 = 0; // 爆発を動かなくする
      explosionX = -500; // 画面外に逃がす
      explosionY = -500; // 画面外に逃がす
      //explosion = document.querySelector('#explosion'); // ページロード時に要素が格納されている。変数宣言で
      explosion.style.left = explosionX + 'px';
      explosion.style.top = explosionY + 'px';
    } // remove1 の閉じ

    /*-----
  --------*/

    /*----命中画像を待機位置に移す
     -------*/
    function remove2() {
      stopper2 = 0; // 命中を動かなくする
      HitX = -500; // 画面外に逃がす
      HitY = -500; // 画面外に逃がす
      //Hit = document.querySelector('#Hit'); // ページロード時に要素が格納されている。変数宣言で
      Hit0.style.left = HitX + 'px';
      Hit0.style.top = HitY + 'px';
    } // remove2 の閉じ
    /*--------
   --------*/



    /*--------------------------
            照準撤去
    ----------------------------*/
    removeTarget = (i) => {
      let remove = document.querySelector('#targetScope' + i);
      remove.style.left = -500 + 'px';
      remove.style.top = -500 + 'px';
    } // removeTarget の閉じ







     setBgimg(); // 1回のページリロードにつき1回だけの処理 id=bgimg0 の背景画像を呼び出している。
     // 意味がなくなった。が、コメにするとエラーが出る。背景画像の要素を必要とする処理がページロード直後にあるらしい。忘れた。

  }, false); // DOMCon... の閉じ

/*-------------------------

    ローカル作業スペース

--------------------------*/

/*----------------------------------------------------
　　　　       ローカルブロックここまで
----------------------------------------------------*/

/*--------------------------

     グローバル作業スペース

---------------------------*/


/*

[ マウスカーソルの座標ではなく、その移動量を取得したい。]

マウスムーブイベント発生(わずかでも動いたらイベント発生)
↓
発生した瞬間のマウスカーソルの座標取得し、変数に格納
document.onmousemove = function (e) {
x格納用変数 = e.screenX; (x座標の数値)
y格納用変数 = e.screenY; (y座標の数値)
}
↓
20ミリ秒後にもう１度座標を取得
setTimeout(function(){
x格納用変数２ = e.screenX;
y格納用変数２ = e.screenY;
},20)
↓
x同士、y同士の引き算を行う。
( x の引き算の答えが正なら、マウスは右に動いたことになる。)
↓
背景image,敵機image,命中エフェクトimage,爆発エフェクトimageの座標に
それぞれ加算(代入ではない)すれば、これらが同期して動き、
自機のほうが旋回しているように見える。

(追記)
背景画像などの座標 ＝ 移動前の座標 ＋ ( マウスの移動量 x 移動速度係数 x ストッパー ) +'px';
みたいな形で使用した。
移動速度係数は動くもの全ての座標に使われており、これを０にすると全部を一斉に止めることができる。
ｚキーでの固定はこれを０にしてる。

ストッパー(変数)は命中エフェクトや爆発エフェクトを止めておくのに使用。背景、敵機には使っていない。
普段は値が０で、命中や爆発を待機場所から動かないようにする。
命中や爆発が画面内に呼ばれたときだけ値が１になって他の画像と同期して動くようになる。
待機場所にもどると同時にまた値が０になる。
便利だな、と思ったので。

*/



/*

[ 画面外で待機する敵 と 画面内で動く敵を切り替える ]

配列の中に敵機の要素が格納されてるとする。 → [e0,e1,e2,e3,e4,e5,e6,e7,e8,e9]
定数 enemyA_Max = 10; (用意した敵機の数。配列に入ってるので、配列の長さで表現してもいい。)
変数 firstE = 2;
変数 lastE = 5; が代入されてるときに
下記の関数 setEnemies が呼ばれると

    setEnemies = function () {

      for (let i = 0 ; i < firstE ; i++) {
                          ( = 2 )

        removeEnemy(i);
        // i番の敵機を待機場所に移す関数

      }  // → 0番、1番 の敵機が待機場所へ


      for (let i = firstE ; i < lastE ; i++) {
                   ( = 2 )     ( = 5 )

        popEnemyA(i);
        // i番の敵機を画面内に移す関数

      } // → 2番、3番、4番 の敵機が画面内へ


      for (let i = lastE ; i < enemyA_Max ; i++) {
                  ( = 5 )        ( = 10 )

        removeEnemy(i);
        // i番の敵機を待機場所に移す関数

      } // → 5番 ～ 9番の敵機が待機場所へ。エラーなし。
    }
    // 用意した敵機を 待機組 と 画面内組 に振り分けできる。
    // ゲーム中にこの処理をやると、目の前の敵機がいきなり消えるという欠点もある。

*/



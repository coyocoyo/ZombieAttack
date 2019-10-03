
/*-----------------------------------
　　　　グローバルブロックここから
------------------------------------*/

  /*------------------------
          関数の窓口
   ------------------------*/        

let enemySizeup; // keyBoard.js から呼び出されてる。
  // グローバルで名前だけ宣言しておく。
  // 本体はローカルの中 ↓↓


/* グローバル変数・定数コーナー */
/*---------------------------------------
      複数のjsファイルから参照されたり、
      開発中に微調整される変数
---------------------------------------*/

  /*-- 敵機の耐久力 --*/
  const eDefaultLife0 = 1; // (ゾンビ)
  const eDefaultLife1 = 1; // (ゾンビ)
  const eDefaultLife2 = 2; // (女ゾンビ)
  const eDefaultLife3 = 2; // (ゴースト)
  const eDefaultLife4 = 2; // (ゴースト)
  const eDefaultLife5 = 3; // (ピエロ)
  const eDefaultLife6 = 4; // (シスター)
  const eDefaultLife7 = 3; // (ピエロ)
  const eDefaultLife8 = 4; // (シスター)
  const eDefaultLife9 = 2; // (ゴースト)

  /*-- 敵機の攻撃力 --*/
  const eAttack0 = 5; // (ゾンビ)
  const eAttack1 = 5; // (ゾンビ)
  const eAttack2 = 5; // (女ゾンビ))
  const eAttack3 = 5; // (ゴースト)
  const eAttack4 = 5; // (ゴースト)
  const eAttack5 = 10; // (ピエロ)
  const eAttack6 = 10; // (シスター)
  const eAttack7 = 10; // (ピエロ)
  const eAttack8 = 10; // (シスター)
  const eAttack9 = 5; // (ゴースト)

  /*-- 敵機の得点 --*/
  const eScore0 = 100; // (ゾンビ)
  const eScore1 = 100; // (ゾンビ)
  const eScore2 = 100; // (女ゾンビ))
  const eScore3 = 200; // (ゴースト)
  const eScore4 = 200; // (ゴースト)
  const eScore5 = 300; // (ピエロ)
  const eScore6 = 500; // (シスター)
  const eScore7 = 300; // (ピエロ)
  const eScore8 = 500; // (シスター)
  const eScore9 = 200; // (ゴースト)


/*敵のポップポジション*/
const ePop0 = 2; // (ゾンビ)
const ePop1 = 2; // (ゾンビ)
const ePop2 = 2; // (女ゾンビ)
const ePop3 = 4; // (ゴースト)
const ePop4 = 4; // (ゴースト)
const ePop5 = 4; // (ピエロ)
const ePop6 = 4; // (シスター)
const ePop7 = 4; // (ピエロ)
const ePop8 = 4; // (シスター)
const ePop9 = 4; // (ゴースト)


  /*---- ネタ ----*/

   /*---- 敵機の拡大最大値を個別設定 ----*/

  const eSizeMax0 = 200; //(ゾンビ) 画像の横幅がこの値まで大きくなったら自機にダメージ
  const eSizeMax1 = 200; //(ゾンビ)
  const eSizeMax2 = 200; //(女ゾンビ)
  const eSizeMax3 = 200; //(ゴースト)
  const eSizeMax4 = 200; //(ゴースト)
  const eSizeMax5 = 200; //(ピエロ)
  const eSizeMax6 = 300; //(シスター)
  const eSizeMax7 = 200; //(ピエロ)
  const eSizeMax8 = 300; //(シスター)
  const eSizeMax9 = 200; //(ゴースト)

/*
// 今のところ、敵機が横幅200pxまで大きくなったらダメージを受けるようになっているが、
// 関数enemySizeup(); の 「200」 を "２か所とも" → eSizeMax[i] にすれば、
// UFO は横幅200でダメージ、隕石は横幅300でダメージ、など個別に設定できる。
// 攻撃力、耐久力、スコアも個別設定なので、ボス敵を設定できる。
*/


    // for文で使うので配列に入れておく

  let eDefaultLife = [ // 手動で入れるしかないんだろうか。
  eDefaultLife0,
  eDefaultLife1,
  eDefaultLife2,
  eDefaultLife3,
  eDefaultLife4,
  eDefaultLife5,
  eDefaultLife6,
  eDefaultLife7,
  eDefaultLife8,
  eDefaultLife9];

  let eAttack = [
  eAttack0,
  eAttack1,
  eAttack2,
  eAttack3,
  eAttack4,
  eAttack5,
  eAttack6,
  eAttack7,
  eAttack8,
  eAttack9];

  let eScore = [
  eScore0,
  eScore1,
  eScore2,
  eScore3,
  eScore4,
  eScore5,
  eScore6,
  eScore7,
  eScore8,
  eScore9];

  let eSizeMax = [
  eSizeMax0,
  eSizeMax1,
  eSizeMax2,
  eSizeMax3,
  eSizeMax4,
  eSizeMax5,
  eSizeMax6,
  eSizeMax7,
  eSizeMax8,
  eSizeMax9];

  const enemyA_Max = 10;
  // src を書き換えただけなら、耐久力・攻撃力・スコアの書き換えでOK。
  // 敵機の最大数 (htmlに設置した id の数)
  // Bタイプはないです。

  /*-- その他、微調整用変数 --*/

  const frameHeight = 500; //px フレームの縦の長さ
  const frameWidth = 500; //px フレームの横の長さ
  // フレームの縦幅、横幅を自動的に取得するコマンドを知らないので手動で入力する。
  // style.width とかで取得できるかも。
  // マウス移動による背景移動の限界値計算に使ってる。
  // 初期のフレームと背景の位置関係にも使ってる。
  // 開発中にフレームの寸法が変わったなら、ここも変更する。

let life = 100;// 自機のHP
  
let remainingBullets　= 12; //残弾数
  
  let enemySpeed = 2; // 敵機の拡大の速さ

  let level = 0;
  // ゲームの段階を示す変数
  // ページロード直後 ＝ 0、
  // ゲーム開始直後に 1 、点数が上がると 2,3,4,5 が代入される。

  const addY = 70;
  // 照準は画面中央よりやや高め。
  // 照準を何ピクセル上にするか調整する変数。

  let scrollrate = 1;
  // 背景画像の移動速度係数。かけ算で処理される。
  // キー操作 「1」 「2」 「3」 でも変更可能

  const interval = 20;
  // マウス移動の計算間隔で使っている。
  // なんとなく 20 。処理が重いなら遅くする可能性あり。

  // 出てくる敵機の種類調整
  let firstE = 0; // 配列の中の何番から何番までの敵を出現させるか、の最初の数。初期値　0
  let lastE = 0; // 配列の中の何番から何番までの敵を出現させるか、の最後の数。初期値 3
  /* (例)
  firstE = 0 、 lastE = 3 の場合、
  配列の中の　0番 , 1番 , 2番 が500x500フレーム内で動く。他は待機場所で待機
  */

  let score = 0; // 得点

  let enemyA = [];
  // 敵機の要素取得用
  // function.js と mouseMove.js が共用してる。
  // getElementById や querySelector で要素をその都度入れてる。
  // それぞれのローカルで同名の変数を宣言しても問題ない。どちらもローカルなら。

  let enemySizeA = [];
  // 各敵の大きさを入れておく。 function.js と mouseMove.js で使ってる。
  // 同一の数値を参照したいので、これはグローバルに置くのが安全。

/*------------------------------------
　　　　グローバルブロックここまで
------------------------------------*/



/*--------------------------------------
     ローカルブロックここから
    ここで宣言した変数、関数は
他の .js ファイルからは読み込まれない。
---------------------------------------*/

document.addEventListener('DOMContentLoaded',
  function () {
    'use strict';

  let timer2; // 敵機の拡大処理、自機の被ダメージ判定で使用

/*------------------------------------------------
　　　　            敵の拡大、攻撃処理
--------------------------------------------------*/

  //function enemySize(){ // ← これはエラーになる
  //enemySizeup = function(){ // ← これは通る。
  enemySizeup = () => { // アロー関数も通る。アロー関数が最近は主流らしい。

    clearTimeout(timer2);
    // これがないと、敵の種類を変えるごとに拡大が加速する。

    for (let i = firstE ; i < lastE ; i++) {
      enemyA[i] = document.querySelector("#enemyA" + i);
      // 敵の拡大部
      //enemyA[i].width = enemySize[i] + "px";
      //enemyA[i].height = enemySize[i] + "px";

      // 拡大処理
      //if (enemySizeA[i] < 200) {
      if (enemySizeA[i] < eSizeMax[i]) { // ネタ +++++++++++++++++++++++++++++++++++++++++++++++
        enemySizeA[i] += enemySpeed;
        //console.log(enemySize[i]); //
        enemyA[i].style.width = enemySizeA[i] + "px";
        enemyA[i].style.height = enemySizeA[i]/(enemyA[i].naturalWidth/enemyA[i].naturalHeight) + "px";
        //console.log(enemyA[i].style.width);
        //console.log(enemyA[i].style.height);
        
        
         let bgimg = new Image();
         bgimg.src = document.getElementById('bgimg' + 0).src;
        
        if (i >= 3 && i <= 7) {
          enemyA[i].style.top = (bgimg.height - enemySizeA[i] / (enemyA[i].naturalWidth / enemyA[i].naturalHeight) + 'px');
       
          console.log(bgimg.height);
        }

      } // if文の閉じ ここまでは正常に機能してる

      // ダメージ判定部
      //if (enemySizeA[i] >= 200) {      
      if (enemySizeA[i] >= eSizeMax[i]) { // ネタ ++++++++++++++++++++++++++++++++++++++++++++++
              life -= eAttack[i];
       
              //ダメージエフェクト
              document.querySelector('.manDamage').style.display = 'block';
  
        let damageNone = function () {
          document.querySelector('.manDamage').style.display = 'none';
        }
        setTimeout(damageNone, 5000);
        

        if (life > 0) {
          console.log('Life : ' + life);
          document.querySelector('#life').textContent = 'Life：' + life;
          soundDamaged(); // audio.js の関数
          popEnemyA(i); // mouseMove.js の関数
          // for文用の i を引数にして敵のリポップ関数を呼び出し。機能してるっぽい。
        } else {
          //document.querySelector('.game__wrapper').style.display = 'none';
          document.querySelector('.game__over').style.display = 'block';
          document.querySelector('#score').style.display = 'none';
          document.querySelector('#level').style.display = 'none';
          document.querySelector('#life').style.display = 'none';
          document.querySelector('#cockpit_01').style.display = 'none';
          document.querySelector('#bgimg0').style.display = 'none';
          document.querySelector('#targetScope0').style.display = 'none';
          document.querySelector('#bullets').style.display = 'none';
          playBgm2(); // audio.js の関数
          document.querySelector('#result').innerHTML = '最終スコア：' + score;

          // 全ての敵機を待機位置に。
          firstE = 0;
          lastE = 0;
          setEnemies();// mouseMove.js の関数
    
        }

      } // if文の閉じ
    } // for文の閉じ

 /*--------------------------------------------------------------------------------------

              要調整部分　スコアによる敵機再配置　どれくらいがゲームとしてちょうどいいのか
 
  --------------------------------------------------------------------------------------*/

    /*---- スコアによる敵機の再配置 ----*/
    if (score >= 1000 && level === 1) {
      level = 2;
      document.getElementById('level').textContent = 'level : ' + level;
      enemySpeed = 4;
      firstE = 0;
      lastE = 4;
      setEnemies(); // mouseMove.js の関数(first と last で指定された範囲の敵機をフレーム内に配置する。)
      enemySizeup(); // 拡大開始
    } else if (score >= 2000 && level === 2) {
      level = 3;
      document.getElementById('level').textContent = 'level : ' + level;
      enemySpeed = 6;
      firstE = 1;
      lastE = 5;
      setEnemies(); //  mouseMove.js の関数
      enemySizeup(); // 拡大開始
    } else if (score >= 3000 && level === 3) {
      level = 4;
      document.getElementById('level').textContent = 'level : ' + level;
      enemySpeed = 8;
      firstE = 2;
      lastE = 6;
      setEnemies(); //  mouseMove.js の関数
      enemySizeup(); // 拡大開始
    } else if (score >= 4000 && level === 4) {
      level = 5;
      document.getElementById('level').textContent = 'level : ' + level;
      enemySpeed = 10;
      firstE = 4;
      lastE = 10;
      setEnemies(); // mouseMove.js の関数
      enemySizeup(); // 拡大開始
    }

    timer2 = setTimeout(enemySizeup, 200);
    // console.log('関数enemySizeupが呼び出されました');
    // こいつが元凶だった・・・。
    // setInterval なら繰り返し処理なので、処理の閉じカッコ 「 } 」 の後に配置するべき。
    // setTimeout は１回きりなので、全部の処理が終わる直前に入れる。

  } // enemySizeup の閉じ
  // timer2 = setInterval(enemySizeup, 200);
//-----敵の拡大、攻撃処理 ここまで


  /*------------------
  
    ローカル作業スペース

  --------------------*/
    
}, false); // DOMCon... の閉じ
/*------------------------------------------------
　　　　            ローカルブロックここまで
--------------------------------------------------*/

  /*-----------------------
  
    グローバル作業スペース

  ------------------------*/

/*

[ 画像の大きさ、縦横比に関係なく
　全ての画像を横幅 10px から 200px に拡大したい。形がゆがんだらダメ。]
let enemySize = 10; // という変数を宣言しているとして
     
let enemyA = document.querySelector("#enemyA0"); // enemyA という、要素を格納するための変数
console.log(enemyA.naturalWidth); // 画像の実際の横幅
console.log(enemyA.naturalHeight); // 画像の実際の縦幅
console.log(enemyA.style.width); // 画像の表示上の横幅 ~~px 単位つき
console.log(enemyA.style.height); // 画像の表示上の縦幅 ~~px 単位つき

画像の '実際の' 横幅と縦幅でわり算をする。( 3になっても1/3になってもどちらでもいい。)
enemyA.naturalWidth/enemyA.naturalHeight
enemyA.style.width = enemySize + 'px'; // 変数 enemySize をそのまま使える。
enemyA.style.height = enemySize * ( enemyA.naturalWidth / enemyA.naturalHeight ) + 'px';

enemySize += 2; と
setTimeout( 処理や関数 , 20 ); や setInterval( 処理や関数 , 20 ); で
少しずつ大きくなる画像を表示できる。
大きさ、縦横比は画像毎に違っていても問題ない。

*/
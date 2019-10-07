
/*-----------------------------------
　　　　グローバルブロックここから
------------------------------------*/

  /*------------------------
          関数の窓口
   ------------------------*/        

let enemySizeup; // keyBoard.js から呼び出されてる。
  // グローバルで名前だけ宣言しておく。
  // 本体はローカルの中 ↓↓

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

    let enemySizeupTimer; // 敵機の拡大処理で使用

    let lvl; // 画面上の Score 表示要素格納
    lvl = document.querySelector('#level'); // 格納しとく

    let l; // 画面上の Life 表示要素格納
    l = document.querySelector('#life'); // 格納しとく

    let largestEnemy; // レーダー試作で使用
    let largestEnemyX; // レーダー試作で使用
    let largestEnemyY; // レーダー試作で使用



/*------------------------------------------------
　　　　            敵の拡大、攻撃処理
--------------------------------------------------*/

  //function enemySize(){ // ← これはエラーになる
  //enemySizeup = function(){ // ← これは通る。
    enemySizeup = () => { // アロー関数も通る。アロー関数が最近は主流らしい。
      // このenemySizeup内の処理は、ゲーム中は100ミリ秒毎に繰り返される。

      
      for (let i = firstE ; i < lastE ; i++) { // 敵の番号 i が必要な処理はここの中に。
      //enemyA[i] = document.querySelector("#enemyA" + i); // ページロードじに全要素格納済み。global.jsのグローバル変数宣言で。
      // 敵の拡大部
      //enemyA[i].width = enemySize[i] + "px";
      //enemyA[i].height = enemySize[i] + "px";

        // 拡大処理
        if (enemySizeA[i] < 200) {
        //if (enemySizeA[i] < eSizeMax[i]) { // ネタ +++++++++++++++++++++++++++++++++++++++++++++++
          enemySizeA[i] += eSpeed[i]*enemySizeupStopper;
          //console.log(enemySize[i]); //
          enemyA[i].style.width = enemySizeA[i] + "px";
          enemyA[i].style.height = enemySizeA[i]/(enemyA[i].naturalWidth/enemyA[i].naturalHeight) + "px";
          //console.log(enemyA[i].style.width);
          //console.log(enemyA[i].style.height);
        } // if文の閉じ ここまでは正常に機能してる

        // ダメージ判定部
        if (enemySizeA[i] >= 200) {      
        //if (enemySizeA[i] >= eSizeMax[i]) { // ネタ ++++++++++++++++++++++++++++++++++++++++++++++

          life -= eAttack[i];
          popEnemyA(i); // mouseMove.js の関数
          // ここでenemySizeA[i] には10が代入されるので、
          // このif文が100ミリ秒毎に繰り返されてる、ということはないと思う。
          // 敵機は小さいのが再ポップしてる。
       
          //ダメージエフェクト
          let manDamage = document.querySelector('.manDamage');
          manDamage.style.display = 'block';
  
          let damageNone = function () {
            manDamage.style.display = 'none';
          } // damageNone の閉じ

          setTimeout(damageNone, 3000);

          // 被ダメージモーション
          recoil = -100; // 反動は大きく
          Player.style.left = recoil + 'px';
          Player.style.top = -1*(recoil/2) + 'px';  // 10px反動。元の座標が left:0 なので。
          recovery = 'yet'; // 反動のため、「まだ撃てない」の状態に。 
          recover(); // weapon.js の関数。反動からの復元処理

          
          if (life > 0) {
            //console.log('Life : ' + life);
            l.textContent = 'Life：' + life;
            soundDamaged1(); // audio.js の関数
            
            // for文用の i を引数にして敵のリポップ関数を呼び出し。機能してるっぽい。
          } // if文の閉じ  

        } // if文の閉じ
        
      } // for文の閉じ

      if (life < 0){ // ゲームオーバー処理 200ミリ秒毎にチェックされてる。
        //document.querySelector('.game__wrapper').style.display = 'none';
        document.querySelector('.game__over').style.display = 'block';
        document.querySelector('#score').style.display = 'none';
        lvl.style.display = 'none'; // ローカル変数宣言で要素取得済み
        l.style.display = 'none'; // 要素はローカルで取得済み
        Player.style.display = 'none';
        document.querySelector('#bgimg0').style.display = 'none';
        document.querySelector('#targetScope0').style.display = 'none';
        Bullets.style.display = 'none'; // グローバルで要素取得済み
        BulletStock.style.display = 'none'; // グローバルで要素取得済み
        playBgm2(); // audio.js の関数
        document.querySelector('#result').textContent = '最終スコア：' + score;



        // 全ての敵機を待機位置に。
        level = 0;
        firstE = 0;
        lastE = 0;
        setEnemies();// mouseMove.js の関数

        callTrickA = 100; // 逆さまオバケ出現管理用 出ないようにするだけ。

        aLeft.style.display = 'none'; // 警告矢印消し。機能してないような・・・。 
        aRight.style.display = 'none';
        aTop.style.display = 'none';
        aBottom.style.display = 'none';




      } // if文の閉じ


      // 逆さまオバケ出現条件
      if (score >= 800 && callTrickA === 0　) { // 800点以上かつ管理変数の値が０ならば
        trickA_1_Down(); // trickA.js の関数。 逆さまオバケ出現 
        callTrickA = 1; // 条件外し。これがないと0.2秒ごとに出現する。 
      } else if (score >= 2200 && callTrickA === 1　) {
        trickA_1_Down(); // 逆さまオバケ
        callTrickA = 2; 
      } else if (score >= 4000 && callTrickA === 2　) {
        trickA_2_Down(); // ピエロ
        callTrickA = 3;
      } else if (score >= 6500 && callTrickA === 3　) {
        trickA_2_Down(); // ピエロ
        callTrickA = 4;
      } else if (score >= 9000 && callTrickA === 4　) {
        trickA_1_Down(); // オバケ
        callTrickA = 5;
      } else if (score >= 12000 && callTrickA === 5　) {
        trickA_2_Down(); // ピエロ
        callTrickA = 6;
      } else if (score >= 16000 && callTrickA === 6　) {
        trickA_1_Down(); // オバケ
        callTrickA = 7;
      } // else if 文の閉じ
      // GameStart時、GameOver時に callTrickA を０にしておく。

 /*--------------------------------------------------------------------------------------

              要調整部分　スコアによる敵機再配置　どれくらいがゲームとしてちょうどいいのか。
              ちなみに、このあたりの行もまだ enemySizeup(); の中。
              setTimeoutで200ミリ秒毎に巡回される処理群

  --------------------------------------------------------------------------------------*/

      /*---- スコアによる敵機の再配置 ----*/
      // 200ミリ秒毎にチェックされてる。
      if (score >= 1000 && level === 1) {
        clearTimeout(enemySizeupTimer);
        // これがないと、敵の種類を変えるごとに拡大が加速する。
        level = 2;
        lvl.textContent = 'level : ' + level;
        firstE = 1;
        lastE = 4;
        setEnemies(); // mouseMove.js の関数(first と last で指定された範囲の敵機をフレーム内に配置する。)
        enemySizeup(); // 拡大開始
      } else if (score >= 2000 && level === 2) {
        clearTimeout(enemySizeupTimer);
        level = 3;
        lvl.textContent = 'level : ' + level;
        firstE = 2;
        lastE = 5;
        setEnemies(); //  mouseMove.js の関数
        enemySizeup(); // 拡大開始
      } else if (score >= 3000 && level === 3) {
        clearTimeout(enemySizeupTimer);
        level = 4;
        lvl.textContent = 'level : ' + level;
        firstE = 4;
        lastE = 7;
        setEnemies(); //  mouseMove.js の関数
        enemySizeup(); // 拡大開始
      } else if (score >= 4000 && level === 4) {
        clearTimeout(enemySizeupTimer);
        level = 5;
        lvl.textContent = 'level : ' + level;
        firstE = 5;
        lastE = 8;
        setEnemies(); // mouseMove.js の関数
        enemySizeup(); // 拡大開始
      } else if (score >= 5000 && level === 5) {
        clearTimeout(enemySizeupTimer);
        level = 6;
        lvl.textContent = 'level : ' + level;
        firstE = 6;
        lastE = 9;
        setEnemies(); // mouseMove.js の関数
        enemySizeup(); // 拡大開始
      } else if (score >= 6000 && level === 6) {
        clearTimeout(enemySizeupTimer);
        level = 7;
        lvl.textContent = 'level : ' + level;
        firstE = 6;
        lastE = 10;
        setEnemies(); // mouseMove.js の関数
        enemySizeup(); // 拡大開始
      } else if (score >= 7000 && level === 7) {
        clearTimeout(enemySizeupTimer);
        level = 8;
        lvl.textContent = 'level : ' + level;
        firstE = 5;
        lastE = 10;
        setEnemies(); // mouseMove.js の関数
        enemySizeup(); // 拡大開始
      } else if (score >= 8000 && level === 8) {
        clearTimeout(enemySizeupTimer);
        level = 9;
        lvl.textContent = 'level : ' + level;
        firstE = 0;
        lastE = 7;
        setEnemies(); // mouseMove.js の関数
        enemySizeup(); // 拡大開始
      } // else if 文の閉じ

     　/*---------------------------
        スコアによる敵の再配置ここまで
　　　　 ----------------------------*/





 　　　　/*---------------------------
          この200ミリ秒ループの中に
           レーダーを試作する。
　　　　 ----------------------------*/

      // 拡大でサイズが最大になってる敵を"特定"したい。値が欲しいわけではない。
      // 場外の敵は一律 10px になるようにした。
 
      largestEnemy  = Math.max(
        enemySizeA[0],
        enemySizeA[1],
        enemySizeA[2],
        enemySizeA[3],
        enemySizeA[4],
        enemySizeA[5],
        enemySizeA[6],
        enemySizeA[7],
        enemySizeA[8],
        enemySizeA[9],
        );
      // console.log(largestEnemy); // ズラズラと数字が出続ける。１０～
      

      
      switch (largestEnemy){

        case enemySizeA[0]: // ← 機能すればいいが。
        largestEnemyX = enemyAX[0];
        largestEnemyY = enemyAY[0];
        //console.log(' 0 番マーク中');
        break;

        case enemySizeA[1]:
        largestEnemyX = enemyAX[1];
        largestEnemyY = enemyAY[1];
        //console.log(' 1 番マーク中');
        break;

        case enemySizeA[2]:
        largestEnemyX = enemyAX[2];
        largestEnemyY = enemyAY[2];
        //console.log(' 2 番マーク中');
        break;

        case enemySizeA[3]:
        largestEnemyX = enemyAX[3];
        largestEnemyY = enemyAY[3];
        //console.log(' 3 番マーク中');
        break;

        case enemySizeA[4]:
        largestEnemyX = enemyAX[4];
        largestEnemyY = enemyAY[4];
        //console.log(' 4 番マーク中');
        break;

        case enemySizeA[5]:
        largestEnemyX = enemyAX[5];
        largestEnemyY = enemyAY[5];
        //console.log(' 5 番マーク中');
        break;

        case enemySizeA[6]:
        largestEnemyX = enemyAX[6];
        largestEnemyY = enemyAY[6];
        //console.log(' 6 番マーク中');
        break;

        case enemySizeA[7]:
        largestEnemyX = enemyAX[7];
        largestEnemyY = enemyAY[7];
        //console.log(' 7 番マーク中');
        break;

        case enemySizeA[8]:
        largestEnemyX = enemyAX[8];
        largestEnemyY = enemyAY[8];
        //console.log(' 8 番マーク中');
        break;

        case enemySizeA[9]:
        largestEnemyX = enemyAX[9];
        largestEnemyY = enemyAY[9];
        //console.log(' 9 番マーク中');
        break;                                

      } // switch の閉じ
      
      if ( largestEnemyX <= 0 && aLeft.style.display === 'none' && life > 0){ // 左の画面外にいるならば
        //console.log('左アラート');
        aLeft.style.display = 'block';
        aRight.style.display = 'none'; // 無駄な記述かもしれない。
        aTop.style.display = 'none';
        aBottom.style.display = 'none';

      } else if ( largestEnemyX >= frameWidth && aRight.style.display === 'none' && life > 0){ // 右の画面外にいるならば
        //console.log('右アラート');
        aLeft.style.display = 'none';
        aRight.style.display = 'block';
        aTop.style.display = 'none';
        aBottom.style.display = 'none';

      } else if ( largestEnemyY <= 0 && aTop.style.display === 'none' && life > 0){ // 上の画面外にいるならば
        //console.log('上アラート');
        aLeft.style.display = 'none';
        aRight.style.display = 'none';        
        aTop.style.display = 'block';
        aBottom.style.display = 'none';

      } else if ( largestEnemyY >= frameHeight && aBottom.style.display === 'none' && life > 0) { // 下の画面外にいるならば
        //console.log('下アラート');
        aLeft.style.display = 'none';
        aRight.style.display = 'none';        
        aTop.style.display = 'none';
        aBottom.style.display = 'block';
      } else if (largestEnemyX >= 0 && largestEnemyX <= frameWidth && largestEnemyY >= 0 && largestEnemyY <= frameHeight){ 
        // マークしてる敵が画面内にいるならば
        aLeft.style.display = 'none';
        aRight.style.display = 'none';
        aTop.style.display = 'none';
        aBottom.style.display = 'none';
        // 全部消せ、の意  
      }

 　　　　/*---------------------------
          レーダーここまで
　　　　 ----------------------------*/




      enemySizeupTimer = setTimeout(enemySizeup, 200);
      // console.log('関数enemySizeupが呼び出されました');
      // setInterval なら繰り返し処理なので、処理の閉じカッコ 「 } 」 の後に配置するべき。
      // setTimeout は１回きりなので、全部の処理が終わる直前に入れるとループになる。

    } // enemySizeup の閉じ
    //timer2 = setInterval(enemySizeup, 100);
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
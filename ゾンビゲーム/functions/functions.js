
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
        //if (enemySizeA[i] < 200) {
        if (enemySizeA[i] < eSizeMax[i]) { // ネタ +++++++++++++++++++++++++++++++++++++++++++++++
          enemySizeA[i] += eSpeed[i]*enemySizeupStopper;
          //console.log(enemySize[i]); //
          enemyA[i].style.width = enemySizeA[i] + "px";
          enemyA[i].style.height = enemySizeA[i]/(enemyA[i].naturalWidth/enemyA[i].naturalHeight) + "px";
          //console.log(enemyA[i].style.width);
          //console.log(enemyA[i].style.height);
        } // if文の閉じ ここまでは正常に機能してる

        // ダメージ判定部
        //if (enemySizeA[i] >= 200) {      
        if (enemySizeA[i] >= eSizeMax[i]) { // ネタ ++++++++++++++++++++++++++++++++++++++++++++++

          life -= eAttack[i];
          popEnemyA(i); // mouseMove.js の関数
          // ここでenemySizeA[i] には10が代入されるので、
          // このif文が100ミリ秒毎に繰り返されてる、ということはないと思う。
          // 敵機は小さいのが再ポップしてる。
       
          //ダメージエフェクト
          let manDamageX; // 被ダメージエフェクトのｘ座標格納用
          let manDamageY; // 被ダメージエフェクトのｙ座標格納用
          let manDamageBlood;
          let manDamage; // 被ダメージエフェクトの要素格納用(画像ではないので寸法取得できない？)
          manDamageBlood = document.querySelector('.manDamageBlood'); // 画像の要素取得
          manDamageX = (frameWidth / 2) - (manDamageBlood.width / 2);
          manDamageY = (frameHeight) - (manDamageBlood.width*(manDamageBlood.naturalWidth/manDamageBlood.naturalHeight));
          manDamage = document.querySelector('.manDamage');
          manDamage.style.display = 'block';
          manDamage.style.left = manDamageX + 'px';
          manDamage.style.top = manDamageY + 'px';

  
          let damageNone = function () {
            manDamage.style.display = 'none';
          } // damageNone の閉じ

          setTimeout(damageNone, 1000);

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

      } // if文の閉じ


 

 /*--------------------------------------------------------------------------------------

              要調整部分　スコアによる敵機再配置　どれくらいがゲームとしてちょうどいいのか。
              ちなみに、このあたりの行もまだ enemySizeup(); の中。
              setTimeoutで200ミリ秒毎に巡回される処理群

  --------------------------------------------------------------------------------------*/






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
      
      if ( largestEnemyX <= 0 && life > 0){ // 左の画面外にいるならば
        //console.log('左アラート');
        aLeft.style.left = 0 + 'px';
        aLeft.style.top = (frameHeight / 2 - aLeft.height / 2) + 'px';

      } else if ( largestEnemyX >= frameWidth && life > 0){ // 右の画面外にいるならば
        //console.log('右アラート');
        aRight.style.top = (frameHeight / 2 - aRight.height / 2) + 'px';
        aRight.style.left = (frameWidth - aRight.width) + 'px';

      } else if ( largestEnemyY <= 0 && life > 0){ // 上の画面外にいるならば
        //console.log('上アラート');
        aTop.style.left = (frameWidth / 2 - aTop.width / 2) + 'px';
        aTop.style.top = 0 + 'px';

      } else if ( largestEnemyY >= frameHeight && life > 0) { // 下の画面外にいるならば
        //console.log('下アラート');
        aBottom.style.top = (frameHeight - aBottom.height) + 'px';
        aBottom.style.left = (frameWidth / 2 - aBottom.width / 2) + 'px';

      } else if (largestEnemyX >= 0 && largestEnemyX <= frameWidth && largestEnemyY >= 0 && largestEnemyY <= frameHeight){ 
        // マークしてる敵が画面内にいるならば
        aLeft.style.left = -500 + 'px';
        aRight.style.left = -500 + 'px';
        aTop.style.left = -500 + 'px';
        aBottom.style.left = -500 + 'px';

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
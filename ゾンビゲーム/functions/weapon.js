
/*-- .jsファイルの名前を変えた場合は、htmlの下のほうのパスの書き換えだけでOKです。 --*/

/*------------------------------
  グローバルブロック ここから
-------------------------------*/

/* ---- 関数の窓口 ---- */

//let funcFreeA; // keyBoard.js キーボード「8」で呼び出し。

let shoot; // mouseMove.js 、 keyBoard.js からの呼び出しあり。
let reload; // keyBoard.js からの呼び出しあり。
let changeWeapon; // keyBoard.js からの呼び出し
let setHandGun; // 持ち替え処理の関数。keyBoard.js からの呼び出しあり。
let recover; // 反動からの復帰モーション。ダメージのモーションとしても使いまわすことに

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

    /* ---- ローカル変数宣言 ---- */

    //let num; // B も C もローカルで 変数num を宣言しているが、エラーにはならない。


    let shootHandGun; // 拳銃の発射処理の関数
    let shootShotGun; // ショットガンの発射処理関数

    let reloadHandGun;
    let reloadShotGun; // 力作

    // let setHandGun; // (上)グローバルに引っ越し   
    let setShotGun; // 持ち替え処理の関数

    /* ---- 関数 ---- */

    /*--------------------------
        各武器による射撃処理
    --------------------------*/

    /*-- 反動からの回復動作。　完了したら recovery を 'done' にする。 全武器共通--*/
    recover = () => {

      if (recoil < 0) {
        recoil += 2;
        Player.style.left = ( playerX + recoil ) + 'px';
        Player.style.top = (playerY - recoil / 2) + 'px';
        setTimeout(recover, 20);
      } else {
        recoil = 0; // global.js で宣言済み
        Player.style.left = playerX + 'px';
        Player.style.top = playerY + 'px';
        recovery = 'done'; // global.js で宣言済み
      }
    }

    /*-- 拳銃の射撃処理 --*/
    shootHandGun = () => { // アロー関数も通る。関数の呼び合いをするならアロー関数の使用頻度が高いのは分かる気がする。
      if (handgunBullets > 0) {
        soundHandGun(); // audio.js の関数呼び出し
        handgunBullets -= 1; //残弾数の減少
        Bullets.textContent = '残弾数 : ' + handgunBullets; // 残弾数の画面表示
        hitJudge();// mouseMove.js の関数呼び出し。射撃の当たり判定。
        recoil = -10; // 反動小さめ
        Player.style.left = (playerX + recoil) + 'px'; // 反動を主人公画像の座標に加算
        Player.style.top = (playerY - recoil / 2) + 'px'; // 反動を主人公画像の座標に加算
        recovery = 'yet'; // 反動のため、「まだ撃てない」の状態に。 
        recover(); // 反動からの復元処理

      } else {
        soundNoBullet1(); // audio.js の関数呼び出し。弾切れ音 カチャッ
      } // ifの閉じ
    } // shoot() の閉じ


    /*-- ショットガンの射撃処理 --*/
    shootShotGun = () => { // アロー関数も通る。関数の呼び合いをするならアロー関数の使用頻度が高いのは分かる気がする。
      if (shotShell > 0) {
        soundShotGun(); // audio.js の関数呼び出し
        shotShell -= 1; //残弾数の減少
        Bullets.textContent = '装填数 : ' + shotShell;

        /*
        hitJudge(); // mouseMove.js の関数呼び出し。射撃の当たり判定。
        hitJudge();
        // ４回呼び出してる。威力は拳銃の４倍。
        // のはずだがピッタリと機能していないような。処理を飛ばしてる？
        let more2HitJudge;
        more2HitJudge = function () {
          hitJudge();
          hitJudge();
        }
        let timer = setTimeout(more2HitJudge, 50);// 時間差で２発処理させてみる。
        */

        // こういう手もあるかもしれない。エフェクトが６回見えてもいいはずだが。
        hitJudge(); // １発目
        let timer2 = setTimeout(hitJudge, 20);
        let timer3 = setTimeout(hitJudge , 40);
        let timer4 = setTimeout(hitJudge , 60);
        let timer5 = setTimeout(hitJudge , 80);
        let timer6 = setTimeout(hitJudge , 100); // ６回判定に変更。              


        recoil = -60; // 反動は大きめ
        Player.style.left = (playerX + recoil) + 'px';
        Player.style.top = (playerX - recoil / 2) + 'px';
        recovery = 'yet'; // 反動のため、「まだ撃てない」の状態に。 
        recover(); // 反動からの復元処理

      } else {
        soundNoBullet1(); // audio.js の関数呼び出し。弾切れ音 カチャッ
      } // ifの閉じ
    } // shoot() の閉じ





    /*-- 武器による処理の振り分け --*/
    shoot = () => {

      if (level === 0) { // ゲームスタート前なら
        soundHandGun(); // 音だけ。 音源のロードが終わっているか試すことがある。
      } else {
        switch (weaponSelector) { // (recoil)反動からの(recovery)回復が完了してるなら射撃へ。
          case 0: if (recovery === 'done') { shootHandGun(); }
            break;
          case 1: if (recovery === 'done') { shootShotGun(); }
            break;
          /*
          case 2 : if (recovery === 'done') { shootHandGun(); }// 未実装
          break;
          */

        } // switch の閉じ
      } // if の閉じ

    } // shoot の閉じ

    /*----------------------------
        各武器による射撃処理ここまで
    -----------------------------*/




    /*----------------------------
        各武器のリロード処理
    -----------------------------*/

    /*-- 拳銃のリロード処理 --*/
    reloadHandGun = () => {
      handgunBullets = 12;
      hgMagazines -= 1;
      soundReload1(); // audio.js の関数呼び出し
      Bullets.textContent = '残弾数 : ' + handgunBullets;
      BulletStock.textContent = 'マガジン : ' + hgMagazines;
    }

    /*-- ショットガンのリロード処理 --*/
    /*-- ショットガンは継ぎ足し充填なのでちょっと特殊 --*/
    reloadShotGun = () => {
      let need; // 必要量
      // shotShellMax はショットガンに装填できる弾の最大値。定数６で設定。global.js
      // shotShell はショットガンに装填されてる弾の残り。
      need = shotShellMax - shotShell; // 何発減っていて、満タンまで何発必要か。
      if ( need < 0 ) { // 装填されてる弾数が最大装填数よりも多いならば、(10000発をやってるとき)
        shotShell = 6; // 6 発にしろ。
      } else if (need <= sShellStock) { // (通常モードで)必要量よりも予備のほうが多いならば
        shotShell += need; // 装填して
        sShellStock -= need; // 予備を減らせ。
      } else if ( need >= sShellStock ) { // 必要量よりも予備のほうが少ないならば
        shotShell += sShellStock; // 予備を全部装填して
        sShellStock = 0; // 予備を０にしろ。
      }

      soundReload1(); // audio.js の関数呼び出し
      Bullets.textContent = '装填数 : ' + shotShell;
      BulletStock.textContent = '予備 : ' + sShellStock;
    }



    /*-- 武器による処理の振り分け --*/
    reload = () => {

      switch (weaponSelector) {

        case 0: if (hgMagazines > 0) { reloadHandGun(); }
          break;

        case 1: if (sShellStock > 0) { reloadShotGun(); }
          break;

        case 2: if (hgMagazines > 0) { reloadHandGun(); }// 未実装
          break;

      } // switch の閉じ

    } // reload の閉じ
    /*----------------------------
        各武器のリロード処理ここまで
    -----------------------------*/


    /*----------------------------
        武器の持ち替え処理 「 c 」 キー
    -----------------------------*/

    setHandGun = () => {
      removePlayer(1); // mouseMove.js の関数。１番(ショットガン)のプレイヤー画像を撤去する。
      removeTarget(1); // mouseMove.js の関数。１番(ショットガン)の照準画像を撤去する。
      Player_Width = Player0_Width;
      // global.js の変数宣言参照。css の .style.width を pxなしの数値でもらいたいだけ。
      // 主人公画像を画面サイズに関係なく真ん中に配置するために必要。
      // 横幅を格納してから主人公画像(拳銃)をセットする。
      setPlayer(0); // mouseMove.js の関数。０番のプレイヤー画像を設置する。

      // 武器の持ち替え時のモーションに見えそうなもの。射撃による反動を使い回し。
      recoil = -40; // これぐらい？
      Player.style.left = (playerX + recoil) + 'px';
      Player.style.top = (playerY - recoil) + 'px';
      recovery = 'yet'; 
      recover();
      
      setTarget(0); // mouseMove.js の関数。０番の照準を設置する。
      Bullets.textContent = '残弾数 : ' + handgunBullets; // テキスト表示
      BulletStock.textContent = 'マガジン : ' + hgMagazines; // テキスト表示
    }

    setShotGun = () => {
      removePlayer(0); // mouseMove.js の関数。０番(拳銃)のプレイヤー画像を撤去する。
      removeTarget(0); // mouseMove.js の関数。０番(拳銃)の照準画像を撤去する。
      Player_Width = Player1_Width;
      setPlayer(1); // mouseMove.js の関数。１番のプレイヤー画像を設置する。

      // 武器の持ち替え時のモーションに見えそうなもの。射撃による反動を使い回し。
      recoil = -40; // これぐらい？
      Player.style.left = (playerX + recoil) + 'px';
      Player.style.top = (playerY - recoil) + 'px';
      recovery = 'yet'; 
      recover();

      setTarget(1); // mouseMove.js の関数。１番の照準を設置する。
      Bullets.textContent = '装填数 : ' + shotShell; // テキスト表示
      BulletStock.textContent = '予備 : ' + sShellStock; // テキスト表示
    }



    /*-- 処理の振り分け --*/
    changeWeapon = () => {

      switch (weaponSelector) {

        case 0:
          setShotGun();
          soundReload1(); // 武器の持ち替え音。リロード音を使い回し。
          weaponSelector = 1;
          break;

        case 1:
          setHandGun();
          soundReload1(); // 武器の持ち替え音。リロード音を使い回し。
          weaponSelector = 0; // ここでループ。２にすれば新武器につながる。
          break;

        /*
        case 2 :
          setHandGun();
          weaponSelector = 0; // ここでループ
          break;
        */

      } // switch の閉じ

    } // changeWeapon の閉じ
    /*----------------------------
        武器の持ち替え処理ここまで
    -----------------------------*/



    // グローバルで宣言した関数の本定義
    //function = funcFreeA(){ // ← エラーになる。
    //funcFreeA = function(){ // ← この形は通る。
    //funcFreeA = () => {
    //  console.log('keyBoard.js から freeSpaceA.js の');
    //  console.log('ローカル関数[ funcFreeA ] が呼び出されました。');
    //}
    //console.log('呼ばれなくてもページロード直後に1度だけ処理されるもの : A');

  }, false); // DOMCon... の閉じ


/*------------------
    作業スペース
-------------------*/




/*-----------------------------
    ローカルブロックここまで
-----------------------------*/
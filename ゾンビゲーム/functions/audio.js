
/*-------------------------------------
          グローバルブロック ここから
--------------------------------------*/

/*-----
処理負荷軽減のため、
querySelector での要素取得の重複を解消しました。
１度変数に要素を格納したら、以降は変数を読むだけで取得処理はしないように、と。
-----*/

/*---- 関数の窓口 ----*/

let soundHandGun; // 拳銃の発射音
let soundShotGun; // ショットガンの発射音
let soundHit1; // 自機の攻撃の命中音。破壊したとは限らない。
let soundDestroy1; // 敵機の爆発音
let soundDamaged1; // 攻撃を受けた時の音
let playBgm1; // BGM1再生
let playBgm2; //game overのbgm
let soundZombieVoive1; //ゾンビボイス
let soundReload1; //銃リロード音
let soundNoBullet1; //残弾数0の発射音


// 外部からの関数を呼び出しを受け止めるために
// 関数の名前だけグローバルで宣言しておく。
// 関数の本体はローカルの中 ↓↓

/*-------------------------------------
          グローバルブロック ここまで
--------------------------------------*/

/*------------------------------------------------
　　　　            ローカルブロックここから
--------------------------------------------------*/
document.addEventListener('DOMContentLoaded',
  function () {
    'use strict';

    // 処理負荷軽減のため、要素格納用の変数を設定。ネーミングが面倒・・・。
    let HandGun01 = document.querySelector('#soundHandGun01'); 
    let HandGun02 = document.querySelector('#soundHandGun02'); // 連射制御用
    let ShotGun = document.querySelector('#soundShotGun');
    let Reload1 = document.querySelector('#reload1');
    let Hit1 = document.querySelector('#soundHit1');
    let Destroy1 = document.querySelector('#soundDestroy1');
    let Damaged1 = document.querySelector('#soundDamaged1');
    let Bgm1 = document.querySelector('#Bgm1');
    let Bgm2 = document.querySelector('#Bgm2');
    let ZombieVoice1 = document.querySelector('#soundZombieVoice1');
    let NoBullet1 = document.querySelector('#noBullet1');



    let R = 1; // ローテーション用変数 初期値 1
    soundHandGun = function () {
      switch (R) {
        case 1: soundHandGun01(); break;
        case 2: soundHandGun02(); break;
      } // switch の閉じ
    } // soundShoot の閉じ

    let soundHandGun01 = function () {
      HandGun01.currentTime = 0; // 音源の再生位置を 0秒目からにする。
      HandGun01.volume = 0.3; // 割とかん高い音で耳障りだった 
      HandGun01.play();
      R = 2; // 切り替え。 次にsoundShoot()を実行するときは 02 のほうが鳴る。
    }

    let soundHandGun02 = function () {
      HandGun02.currentTime = 0;
      HandGun02.volume = 0.3; // 0 ~ 1 で設定する。
      HandGun02.play();
      R = 1; // 切り替え。 次にsoundShoot()を実行したときは 01 のほうが鳴る。
    }
    // id を２つぐらい用意すれば軽い連打なら対応できてると思う。

    soundShotGun = function () {
      ShotGun.currentTime = 0; // 音源の再生位置を 0秒目からにする。
      ShotGun.volume = 0.3; // 割とかん高い音で耳障りだった 
      ShotGun.play();
    }

    soundHit1 = function () {
      Hit1.currentTime = 0;
      Hit1.volume = 0.1; // 0 ~ 1 で設定する。
      Hit1.play();
    }

    // 敵機を撃墜したときの音
    soundDestroy1 = function () {
      Destroy1.currentTime = 0;
      Destroy1.volume = 1; // 0 ~ 1 で設定する。
      Destroy1.play();
    }

    soundDamaged1 = function () {
      Damaged1.currentTime = 0;
      Damaged1.volume = 0.8; // 0 ~ 1 で設定する。
      Damaged1.play();
    }

    playBgm1 = function () {
      Bgm2.pause();
      Bgm2.currentTime = 0;
      Bgm1.volume = 0.6; // 0 ~ 1 で設定する。
      Bgm1.play();
    }

    playBgm2 = () => {
      Bgm1.pause();
      Bgm1.currentTime = 0;
      Bgm2.play();
    }

    soundZombieVoive1 = function () {
      ZombieVoice1.currentTime = 0;
      ZombieVoice1.volume = 1; // 0 ~ 1 で設定する。
      ZombieVoice1.play();
    }

    soundReload1 = function () {
      Reload1.currentTime = 0;
      Reload1.volume = 1; // 0 ~ 1 で設定する。
      Reload1.play();
    }

    soundNoBullet1 = function () {
      NoBullet1.currentTime = 0;
      NoBullet1.volume = 1; // 0 ~ 1 で設定する。
      NoBullet1.play();
    }




  }, false); // DOMCon... の閉じ

/*------------------------------------------------
　　　　            ローカルブロックここまで
--------------------------------------------------*/
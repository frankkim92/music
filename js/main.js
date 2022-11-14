// SPA 라우팅 설정 ------------------------------------------
import { app } from "./firebase.js";
import {
  handleAuth,
  onToggle,
  logout,
  changeProfile,
  onFileChange,
} from "./auth.js";
import { route, handleLocation, goToProfile } from "./router.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { socialLogin } from "./auth.js";
import { save_comment } from "./fanLog.js";

// url 바뀌면 handleLocation 실행하여 화면 변경
window.addEventListener("hashchange", handleLocation);

// 첫 랜딩 또는 새로고침 시 handleLocation 실행하여 화면 변경
document.addEventListener("DOMContentLoaded", function () {
  const auth = getAuth();
  // Firebase 연결상태를 감시
  auth.onAuthStateChanged((user) => {
    // Firebase 연결되면 화면 표시
    // console.log("user:", user);
    handleLocation();
    const hash = window.location.hash;
    if (user) {
      // 로그인 상태이므로 항상 팬명록 화면으로 이동
      localStorage.setItem("nickname", user.displayName);
      localStorage.setItem("profileUrl", user.photoURL);
      if (hash === "") {
        // 로그인 상태에서는 로그인 화면으로 되돌아갈 수 없게 설정
        window.location.replace("#fanLog");
      }
    } else {
      // 로그아웃 상태이므로 로그인 화면으로 강제 이동
      if (hash !== "") {
        window.location.replace("");
      }
    }
  });
});

window.onToggle = onToggle;
window.handleAuth = handleAuth;
window.goToProfile = goToProfile;
window.socialLogin = socialLogin;
window.logout = logout;
window.onFileChange = onFileChange;
window.changeProfile = changeProfile;
window.save_comment = save_comment;

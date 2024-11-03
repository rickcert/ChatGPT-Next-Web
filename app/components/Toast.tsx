import { useEffect } from "react";
import styles from "./Toast.module.scss";

export function Toast() {
  printLog();
  useEffect(() => {
    showToast();
    const interval = setInterval(() => {
      const uptimeElement = document.getElementById("uptime");
      if (uptimeElement) {
        uptimeElement.innerHTML = calculateUptime();
      }
    }, 3600000);
    return () => clearInterval(interval);
  }, []);

  function setCookie({
    name,
    value,
    days,
  }: {
    name: any;
    value: any;
    days: any;
  }) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  function getCookie({ name }: { name: any }) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  function calculateUptime() {
    const startTime = new Date("2024-10-20T00:00:00");
    const now = new Date();
    const diff = now.getTime() - startTime.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `
      <span class="${styles["uptime-icon"]}" role="img" aria-label="success">
        <!-- SVG 图标 -->
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" focusable="false" aria-hidden="true">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM17.8831 9.82235L11.6854 17.4112C11.4029 17.7806 10.965 17.9981 10.5 18C10.035 18.0019 9.59533 17.788 9.30982 17.421L5.81604 13.4209C5.30744 12.767 5.42524 11.8246 6.07916 11.316C6.73308 10.8074 7.67549 10.9252 8.1841 11.5791L10.4838 14.0439L15.5 8C16.0032 7.34193 16.9446 7.21641 17.6027 7.71964C18.2608 8.22287 18.3863 9.16428 17.8831 9.82235Z" fill="currentColor"></path>
        </svg>
      </span>
      稳定运行 <span class="${styles["uptime-number"]}">${days}</span> 天 <span class="${styles["uptime-number"]}">${hours}</span> 小时
    `;
  }

  function showToast() {
    if (getCookie({ name: "toastClosed" })) {
      return;
    }
    const toast = document.getElementById("toast");
    if (toast) {
      toast.style.display = "block";
    }
  }

  function closeToast() {
    const toast = document.getElementById("toast");
    if (toast) {
      toast.style.display = "none";
      setCookie({ name: "toastClosed", value: "true", days: 1 });
    }
  }
  function printLog() {
    const banner = `
  ██████  ███████ ██    ██      █████  ██████  ██ 
  ██   ██ ██      ██    ██     ██   ██ ██   ██ ██ 
  ██   ██ █████   ██    ██     ███████ ██████  ██ 
  ██   ██ ██       ██  ██      ██   ██ ██      ██ 
  ██████  ███████   ████       ██   ██ ██      ██ 
                                                

            🥹 DEV API v1.0 by rick 😚
            `;

    const message = ` 😶‍🌫️ 送一些兑换码，一人一个，多用小心封号!! 💦：
            9e3202ef12c14667a1130fdfff998b5b
            9dcd3bc1b1cd44b982e37053b6e05731
            160dd093350b4a3a8a10641c446b650e
            d02a6bebbc0347f2b73e2ec027ce7c0d
            66d9ad0f02a54c0b8d0623011a310efb
            `;

    console.log(banner);
    console.log(message);
  }

  return (
    <div className={styles.toast} id="toast" style={{ display: "none" }}>
      <div className={styles["toast-inner"]}>
        <div className={styles["toast-header"]}>
          <div className={styles["toast-icon"]}>
            {/* SVG 图标 */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path d="M15.25 5a3.75 3.75 0 1 1 7.5 0a3.75 3.75 0 0 1-7.5 0" />
              <path d="M14.527 2.25a5.25 5.25 0 0 0 7.223 7.223V15A6.75 6.75 0 0 1 15 21.75H9A6.75 6.75 0 0 1 2.25 15V9A6.75 6.75 0 0 1 9 2.25z" />
            </svg>
          </div>
          <div className={styles["toast-title"]}>系统通知</div>
          <button
            className={styles["toast-close"]}
            onClick={closeToast}
            aria-label="close"
          >
            {/* 关闭图标 */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div className={styles["toast-body"]}>
          <img
            src="https://api.crond.dev/rick.png"
            alt="图片"
            style={{ borderRadius: "12px" }}
          />
          <br />
          <p style={{ fontSize: "13px" }}>
            DEV API BY RICK →{" "}
            <a
              href="https://blog.rick.icu"
              style={{ color: "rgb(56, 153, 253)" }}
            >
              RICK
            </a>
          </p>
          <p style={{ fontSize: "13px" }}>
            服务监控 →{" "}
            <a
              href="https://nezha.crond.dev"
              style={{ color: "rgb(56, 153, 253)" }}
            >
              泰坦一号-No.1
            </a>
          </p>
          <p
            id="uptime"
            dangerouslySetInnerHTML={{ __html: calculateUptime() }}
            style={{ fontSize: "13px" }}
          />
        </div>
      </div>
    </div>
  );
}

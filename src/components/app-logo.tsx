import { SVGProps } from 'react';
import { twMerge } from 'tailwind-merge';

const AppLogo = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    className={twMerge('h-auto w-[120px]', className)}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    viewBox="0 0 120 43"
  >
    <path
      d="m100.228 18.606-15.514-15.8c-.564-.47-1.693-2.681.846-2.681 3.808 0 11.763.028 13.117.141 1.354.113 2.068.517 2.256.705 5.501 5.08 16.84 15.744 18.194 17.776 1.354 2.031.565 3.762 0 4.373-5.265 5.079-15.755 16.049-17.489 17.494-1.692 1.41-3.197 2.163-3.949 2.116H84.573c-2.483 0-2.257-1.223-1.834-1.834l17.489-17.494c2.144-2.144.893-4.09 0-4.796Z"
      fill="#FACC15"
    />
    <path
      clipRule="evenodd"
      d="M84.36 2.13c.142.264.309.476.433.58l.005.003 15.513 15.8c.463.367 1.016 1.053 1.178 1.929.165.889-.076 1.952-1.173 3.05l-17.48 17.484c-.2.293-.325.692-.16 1.008.166.315.663.62 1.896.62h13.125c.34.022.877-.14 1.555-.496.673-.354 1.465-.89 2.306-1.59.86-.718 3.909-3.814 7.411-7.376l.358-.365c3.404-3.463 7.166-7.29 9.71-9.744.533-.58 1.3-2.245-.014-4.216-.331-.496-1.284-1.535-2.626-2.902a257.027 257.027 0 0 0-4.899-4.823c-3.691-3.554-7.9-7.49-10.65-10.028l-.002-.002-.002-.002c-.076-.076-.283-.216-.646-.352-.36-.134-.866-.261-1.532-.317-1.347-.112-9.294-.14-13.107-.14-.62 0-.99.135-1.2.32-.205.183-.277.432-.261.71.016.283.123.585.263.849ZM84.195.384C84.469.141 84.91 0 85.559 0c3.804 0 11.767.028 13.127.142.688.057 1.216.188 1.599.331.378.141.622.296.734.408a754.19 754.19 0 0 1 10.653 10.03 258.38 258.38 0 0 1 4.904 4.828c1.336 1.362 2.309 2.419 2.655 2.939 1.392 2.088.584 3.882-.012 4.527l-.003.003-.002.003c-2.542 2.451-6.303 6.278-9.71 9.743l-.357.364c-3.493 3.553-6.556 6.664-7.429 7.392-.851.71-1.658 1.256-2.349 1.62-.683.358-1.272.55-1.684.525H84.572c-1.249 0-1.88-.306-2.117-.755-.234-.445-.04-.957.18-1.275l.007-.01 17.497-17.5c1.047-1.048 1.252-2.03 1.104-2.828-.149-.805-.664-1.444-1.093-1.783l-.006-.005L84.628 2.898c-.156-.133-.34-.372-.488-.65-.15-.284-.273-.622-.292-.952-.02-.332.067-.665.346-.912Z"
      fill="#FACC15"
      fillRule="evenodd"
    />
    <path
      d="M75.514 28.2V15.58h3.335v2.226h.147c.263-.74.701-1.323 1.315-1.75.613-.427 1.347-.641 2.201-.641.865 0 1.602.216 2.21.65a3.056 3.056 0 0 1 1.215 1.74h.132c.257-.722.722-1.3 1.396-1.733.679-.438 1.481-.657 2.407-.657 1.177 0 2.133.375 2.866 1.126.74.745 1.11 1.802 1.11 3.171v8.487h-3.492v-7.797c0-.7-.186-1.227-.558-1.577-.373-.35-.838-.526-1.397-.526-.635 0-1.13.203-1.486.608-.356.4-.534.928-.534 1.585V28.2h-3.393v-7.87c0-.62-.178-1.113-.534-1.48-.35-.367-.813-.55-1.388-.55-.389 0-.739.099-1.051.296-.307.191-.55.463-.731.813-.18.345-.271.75-.271 1.216v7.575h-3.5ZM67.436 28.199v-12.62h3.393v2.202h.131c.23-.783.616-1.375 1.159-1.775a3.044 3.044 0 0 1 1.872-.608c.175 0 .364.011.567.033.203.022.38.052.534.09v3.106a4.568 4.568 0 0 0-.682-.131 6.112 6.112 0 0 0-.797-.058 2.8 2.8 0 0 0-1.38.337c-.4.22-.717.526-.952.92-.23.395-.345.85-.345 1.364v7.14h-3.5ZM60.34 28.446c-1.276 0-2.38-.272-3.31-.814a5.566 5.566 0 0 1-2.144-2.284c-.504-.98-.756-2.117-.756-3.41 0-1.303.252-2.442.756-3.417a5.5 5.5 0 0 1 2.143-2.284c.931-.548 2.035-.822 3.31-.822 1.277 0 2.377.274 3.303.822a5.484 5.484 0 0 1 2.152 2.284c.504.975.755 2.114.755 3.418 0 1.292-.252 2.429-.755 3.41a5.55 5.55 0 0 1-2.152 2.283c-.926.542-2.026.814-3.302.814Zm.016-2.712c.58 0 1.065-.164 1.454-.493.389-.334.682-.788.879-1.363.203-.576.304-1.23.304-1.964s-.102-1.389-.304-1.964c-.197-.575-.49-1.03-.879-1.364-.389-.334-.873-.5-1.454-.5-.586 0-1.079.166-1.478.5-.395.335-.693.79-.896 1.364-.197.575-.295 1.23-.295 1.964s.098 1.388.295 1.963c.203.576.501 1.03.896 1.364.4.329.892.493 1.478.493ZM43.488 28.199V11.373h11.138v2.933h-7.581v4.01h6.842v2.932h-6.842V28.2h-3.557ZM42.26 15.58v2.628h-7.598V15.58h7.598Zm-5.873-3.024h3.5V24.32c0 .323.048.575.147.756a.814.814 0 0 0 .41.37c.181.07.39.106.625.106.164 0 .329-.013.493-.04.164-.034.29-.058.378-.075l.55 2.605a9.876 9.876 0 0 1-.74.189 5.922 5.922 0 0 1-1.157.14c-.844.032-1.583-.08-2.218-.337a3.095 3.095 0 0 1-1.47-1.2c-.35-.542-.523-1.227-.518-2.054V12.556ZM34.446 19.178l-3.204.197a1.656 1.656 0 0 0-.353-.74 1.874 1.874 0 0 0-.715-.533c-.29-.137-.638-.206-1.043-.206-.542 0-1 .115-1.372.345-.372.225-.558.526-.558.904 0 .301.12.556.361.764.241.208.655.375 1.24.501l2.284.46c1.227.252 2.141.658 2.744 1.216.602.56.903 1.293.903 2.202 0 .827-.243 1.553-.73 2.178-.483.624-1.145 1.111-1.989 1.462-.838.345-1.804.518-2.9.518-1.67 0-3-.348-3.991-1.044-.986-.7-1.564-1.654-1.733-2.859l3.441-.18c.104.509.356.898.756 1.166.4.263.912.394 1.536.394.613 0 1.106-.117 1.479-.353.377-.241.569-.55.575-.928a.966.966 0 0 0-.403-.78c-.263-.209-.668-.368-1.216-.477l-2.185-.436c-1.232-.246-2.149-.674-2.751-1.282-.597-.608-.896-1.383-.896-2.325 0-.81.22-1.509.658-2.095.443-.586 1.065-1.038 1.864-1.355.805-.318 1.747-.477 2.826-.477 1.593 0 2.847.337 3.762 1.01.92.674 1.456 1.592 1.61 2.753ZM15.516 28.437c-.805 0-1.522-.14-2.152-.419a3.465 3.465 0 0 1-1.495-1.257c-.361-.558-.542-1.254-.542-2.087 0-.7.129-1.29.386-1.766.258-.477.608-.86 1.052-1.15.443-.29.947-.51 1.511-.657.57-.148 1.166-.252 1.79-.313a45.39 45.39 0 0 0 1.775-.213c.449-.072.775-.176.977-.313.203-.136.304-.34.304-.608v-.049c0-.52-.164-.923-.493-1.207-.323-.285-.783-.428-1.38-.428-.63 0-1.13.14-1.503.42a1.928 1.928 0 0 0-.739 1.034l-3.236-.262a4.4 4.4 0 0 1 .969-1.989c.482-.564 1.103-.997 1.864-1.298.767-.307 1.654-.46 2.662-.46.7 0 1.372.082 2.012.247a5.264 5.264 0 0 1 1.717.764c.504.345.9.788 1.191 1.33.29.537.435 1.181.435 1.931V28.2h-3.318v-1.75h-.099a3.564 3.564 0 0 1-.813 1.044c-.34.295-.747.528-1.224.698-.476.164-1.027.246-1.65.246Zm1.002-2.415c.515 0 .97-.101 1.364-.304.394-.208.704-.488.928-.838.225-.35.337-.748.337-1.191v-1.34c-.11.072-.26.137-.452.198a8.181 8.181 0 0 1-.632.156c-.236.044-.471.085-.707.123l-.64.09c-.411.06-.77.156-1.077.288a1.72 1.72 0 0 0-.714.534c-.17.219-.255.493-.255.822 0 .476.173.84.518 1.092.35.247.794.37 1.33.37ZM0 28.199V11.373h11.138v2.933H3.557v4.01h6.842v2.932H3.557V28.2H0Z"
      fill="#fff"
    />
    <path
      clipRule="evenodd"
      d="M19.445 3.934c0-.76.617-1.377 1.377-1.377h3.667a1.377 1.377 0 0 1 0 2.755h-3.667c-.76 0-1.377-.617-1.377-1.378ZM20.01 9.86c0-.761.616-1.378 1.377-1.378h11.565a1.377 1.377 0 0 1 0 2.755H21.387c-.76 0-1.377-.617-1.377-1.378ZM37.498 3.934c0-.76.617-1.377 1.377-1.377h8.462a1.377 1.377 0 0 1 0 2.755h-8.462c-.76 0-1.377-.617-1.377-1.378ZM56.962 3.934c0-.76.616-1.377 1.377-1.377H77.52a1.377 1.377 0 0 1 0 2.755H58.34c-.76 0-1.377-.617-1.377-1.378ZM73.322 9.86c0-.761.617-1.378 1.377-1.378h7.052a1.377 1.377 0 0 1 0 2.755H74.7c-.76 0-1.377-.617-1.377-1.378ZM59.219 33.842c0-.76.616-1.377 1.377-1.377h19.463a1.377 1.377 0 0 1 0 2.754H60.596c-.76 0-1.377-.616-1.377-1.377ZM45.397 39.767c0-.76.616-1.377 1.376-1.377H74.7a1.377 1.377 0 0 1 0 2.755H46.773c-.76 0-1.377-.617-1.377-1.378ZM36.37 33.842c0-.76.617-1.377 1.377-1.377h11.001a1.377 1.377 0 0 1 0 2.754h-11c-.761 0-1.378-.616-1.378-1.377ZM28.472 39.485c0-.76.616-1.377 1.377-1.377h5.077a1.377 1.377 0 0 1 0 2.755H29.85c-.76 0-1.377-.617-1.377-1.378ZM5.623 33.842c0-.76.617-1.377 1.377-1.377h16.925a1.377 1.377 0 0 1 0 2.754H7c-.76 0-1.377-.616-1.377-1.377ZM66.27 9.86c0-.761.617-1.378 1.377-1.378h.847a1.377 1.377 0 0 1 0 2.755h-.847c-.76 0-1.377-.617-1.377-1.378Z"
      fill="#FACC15"
      fillRule="evenodd"
    />
  </svg>
);
export default AppLogo;

/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import Svg, {
  Circle,
  Ellipse,
  G,
  Text,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';

export function PieChartSplit({
  color = '#1A3686',
  width = 21,
  height = 21,
  ...props
}) {
  return (
    <Svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M8.75 2.646v8.62l6.33 6.067a8.851 8.851 0 01-2.328 1.392 8.847 8.847 0 01-3.377.65 8.845 8.845 0 01-3.405-.669c-1.082-.446-2.016-1.042-2.798-1.79a8.33 8.33 0 01-1.858-2.676 7.928 7.928 0 01-.689-3.25c0-1.13.23-2.21.689-3.239a8.473 8.473 0 011.86-2.678c.78-.753 1.713-1.348 2.793-1.788a8.902 8.902 0 012.783-.64h0zm10.6 8.979a7.353 7.353 0 01-.606 2.398 7.781 7.781 0 01-1.365 2.102h0l-4.799-4.5zM10.625.645a9.145 9.145 0 013.014.722c1.16.496 2.16 1.162 2.998 2.001a9.448 9.448 0 011.997 2.996c.413.964.653 1.967.72 3.011h0-8.729z"
        stroke={color}
        strokeWidth={1.5}
        fill="none"
        fillRule="evenodd"
      />
    </Svg>
  );
}

export function BFT({color = '#1A3686', width = 21, height = 21, ...props}) {
  return (
    <Svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M10.02 20.5c2.187 0 4.16-.645 5.918-1.934a.668.668 0 00.273-.459.7.7 0 00-.127-.517.676.676 0 00-.459-.283.663.663 0 00-.527.127 8.384 8.384 0 01-5.078 1.66 8.542 8.542 0 01-3.34-.664 8.694 8.694 0 01-2.735-1.856A8.425 8.425 0 012.11 13.84a8.33 8.33 0 01-.683-3.34c0-1.172.221-2.285.664-3.34a8.694 8.694 0 011.855-2.734A8.425 8.425 0 016.68 2.59a8.33 8.33 0 013.34-.684c1.875 0 3.567.554 5.078 1.66.156.118.328.16.517.127a.705.705 0 00.46-.283.678.678 0 00.136-.517.668.668 0 00-.273-.46C14.18 1.146 12.207.5 10.02.5c-1.355 0-2.65.26-3.887.781A9.96 9.96 0 002.949 3.43 9.96 9.96 0 00.801 6.613 9.916 9.916 0 00.02 10.5c0 1.354.26 2.65.78 3.887a9.96 9.96 0 002.15 3.183 9.96 9.96 0 003.183 2.149 9.916 9.916 0 003.887.781zm-4.782-5.605a.781.781 0 010-1.105l4.575-4.574a.781.781 0 011.104 0l2.876 2.876 4.53-4.53h-2.007a.781.781 0 110-1.562h3.893c.438 0 .781.358.781.781v3.893a.781.781 0 11-1.562 0V8.667l-5.082 5.082a.781.781 0 01-1.105 0l-2.876-2.876-4.022 4.022a.781.781 0 01-1.105 0z"
        fill={color}
        fillRule="nonzero"
      />
    </Svg>
  );
}

export function PhoneMessage(props) {
  return (
    <Svg width={49} height={41} xmlns="http://www.w3.org/2000/svg" {...props}>
      <G fill="none">
        <Path
          d="M22.299 41c1.023 0 1.895-.366 2.618-1.098.722-.732 1.083-1.617 1.083-2.654V3.752c0-1.037-.361-1.922-1.083-2.654C24.194.366 23.322 0 22.299 0H3.7C2.678 0 1.806.366 1.083 1.098.361 1.83 0 2.715 0 3.752v33.496c0 1.037.361 1.922 1.083 2.654C1.806 40.634 2.678 41 3.701 41H22.3zm.451-7.321H3.25V7.32h19.5v26.36zm9.713-11.231v-3.125h-.197c-1.05 0-1.936-.334-2.658-1.001-.722-.667-1.083-1.49-1.083-2.466V5.651c0-.977.36-1.807 1.083-2.49.722-.684 1.608-1.026 2.658-1.026h12.993c1.05 0 1.936.342 2.658 1.026C48.64 3.844 49 4.674 49 5.65v10.205c0 .977-.36 1.799-1.083 2.466-.722.667-1.608 1-2.658 1h-7.53c-.46 0-.804.082-1.034.245-.23.163-1.64 1.123-4.232 2.88z"
          fill="#1A3686"
        />
        <Path
          d="M43.837 12.734l-.635-.462.724-.886-1.13-.344.258-.718 1.056.461-.074-1.186h.827l-.074 1.186 1.078-.461.251.718-1.115.344.753.886-.65.462-.634-1.004-.635 1.004zm-3.691 0l-.635-.462.723-.886-1.13-.344.259-.718 1.056.461-.074-1.186h.827l-.074 1.186 1.078-.461.25.718-1.114.344.753.886-.65.462-.635-1.004-.634 1.004zm-3.692 0l-.635-.462.724-.886-1.13-.344.259-.718 1.055.461-.074-1.186h.827l-.073 1.186 1.077-.461.251.718-1.114.344.753.886-.65.462-.635-1.004-.635 1.004zm-3.691 0l-.635-.462.723-.886-1.13-.344.26-.718 1.055.461-.074-1.186h.827l-.074 1.186 1.078-.461.251.718-1.115.344.753.886-.65.462-.634-1.004-.635 1.004z"
          fill="#FFF"
        />
      </G>
    </Svg>
  );
}

export function EmailReload(props) {
  return (
    <Svg width={63} height={40} xmlns="http://www.w3.org/2000/svg" {...props}>
      <G fill="none">
        <Path
          d="M46.462 17.323h-.196c-1.05 0-1.936-.334-2.658-1.001-.722-.667-1.083-1.49-1.083-2.466V3.651c0-.977.36-1.807 1.083-2.49C44.33.477 45.216.135 46.266.135h12.993c1.05 0 1.936.342 2.658 1.026C62.64 1.844 63 2.674 63 3.65v10.205c0 .977-.36 1.799-1.083 2.466-.722.667-1.608 1-2.658 1h-7.53c-.46 0-.804.082-1.034.245-.23.163-1.64 1.123-4.233 2.88v-3.124z"
          fill="#1A3686"
        />
        <Path
          d="M55.914 10.54A3.7 3.7 0 0056.5 8.5a3.716 3.716 0 00-1.102-2.695c-.734-.75-1.617-1.125-2.648-1.125V3.25l-1.875 1.898L52.75 7.07V5.64c.766 0 1.426.282 1.98.844a2.77 2.77 0 01.832 2.016c0 .484-.109.93-.328 1.336l.68.703zm-3.164 3.21l1.875-1.898L52.75 9.93v1.43c-.766 0-1.426-.282-1.98-.844a2.77 2.77 0 01-.833-2.016c0-.484.11-.93.329-1.336l-.68-.703C49.196 7.039 49 7.719 49 8.5c0 1.047.367 1.945 1.102 2.695.734.75 1.617 1.125 2.648 1.125v1.43z"
          fill="#FFF"
        />
        <Path
          d="M36.436 39.088a3.05 3.05 0 002.24-.923 3.051 3.051 0 00.924-2.241V8.414c0-.879-.308-1.626-.923-2.241a3.051 3.051 0 00-2.241-.923H3.345a3.05 3.05 0 00-2.241.923A3.051 3.051 0 00.18 8.414v27.51c0 .879.307 1.626.923 2.241a3.051 3.051 0 002.24.923h33.092zM20 18.873h-.044c-.44 0-.806-.161-1.099-.483l-.087-.044L6.729 8.414h26.323l-11.778 9.844-.087.044-.044.088a1.562 1.562 0 01-1.143.483zm16.436 17.05H3.345V9.689L16.66 20.675c.848.847 1.874 1.3 3.08 1.356l.26.006c1.318 0 2.432-.469 3.34-1.406L36.436 9.688v26.236z"
          fill="#1A3686"
        />
      </G>
    </Svg>
  );
}

export function EmailMessage1(props) {
  return (
    <Svg width={63} height={40} xmlns="http://www.w3.org/2000/svg" {...props}>
      <G fill="none">
        <Path
          d="M46.462 17.323h-.196c-1.05 0-1.936-.334-2.658-1.001-.722-.667-1.083-1.49-1.083-2.466V3.651c0-.977.36-1.807 1.083-2.49C44.33.477 45.216.135 46.266.135h12.993c1.05 0 1.936.342 2.658 1.026C62.64 1.844 63 2.674 63 3.65v10.205c0 .977-.36 1.799-1.083 2.466-.722.667-1.608 1-2.658 1h-7.53c-.46 0-.804.082-1.034.245-.23.163-1.64 1.123-4.233 2.88v-3.124z"
          fill="#1A3686"
        />
        <Path
          d="M55.914 10.54A3.7 3.7 0 0056.5 8.5a3.716 3.716 0 00-1.102-2.695c-.734-.75-1.617-1.125-2.648-1.125V3.25l-1.875 1.898L52.75 7.07V5.64c.766 0 1.426.282 1.98.844a2.77 2.77 0 01.832 2.016c0 .484-.109.93-.328 1.336l.68.703zm-3.164 3.21l1.875-1.898L52.75 9.93v1.43c-.766 0-1.426-.282-1.98-.844a2.77 2.77 0 01-.833-2.016c0-.484.11-.93.329-1.336l-.68-.703C49.196 7.039 49 7.719 49 8.5c0 1.047.367 1.945 1.102 2.695.734.75 1.617 1.125 2.648 1.125v1.43z"
          fill="#FFF"
        />
        <Path
          d="M36.436 39.088a3.05 3.05 0 002.24-.923 3.051 3.051 0 00.924-2.241V8.414c0-.879-.308-1.626-.923-2.241a3.051 3.051 0 00-2.241-.923H3.345a3.05 3.05 0 00-2.241.923A3.051 3.051 0 00.18 8.414v27.51c0 .879.307 1.626.923 2.241a3.051 3.051 0 002.24.923h33.092zM20 18.873h-.044c-.44 0-.806-.161-1.099-.483l-.087-.044L6.729 8.414h26.323l-11.778 9.844-.087.044-.044.088a1.562 1.562 0 01-1.143.483zm16.436 17.05H3.345V9.689L16.66 20.675c.848.847 1.874 1.3 3.08 1.356l.26.006c1.318 0 2.432-.469 3.34-1.406L36.436 9.688v26.236z"
          fill="#1A3686"
        />
      </G>
    </Svg>
  );
}

export function EmailMessage2(props) {
  return (
    <Svg width={65} height={45} xmlns="http://www.w3.org/2000/svg" {...props}>
      <G fill="none">
        <Path
          d="M48.462 22.448v-3.125h-.196c-1.05 0-1.936-.334-2.658-1.001-.722-.667-1.083-1.49-1.083-2.466V5.651c0-.977.36-1.807 1.083-2.49.722-.684 1.608-1.026 2.658-1.026h12.993c1.05 0 1.936.342 2.658 1.026C64.64 3.844 65 4.674 65 5.65v10.205c0 .977-.36 1.799-1.083 2.466-.722.667-1.608 1-2.658 1h-7.53c-.46 0-.804.082-1.034.245-.23.163-1.64 1.123-4.233 2.88z"
          fill="#1A3686"
        />
        <Path
          d="M59.837 12.734l-.635-.462.724-.886-1.13-.344.258-.718 1.056.461-.074-1.186h.827l-.074 1.186 1.078-.461.251.718-1.115.344.753.886-.65.462-.634-1.004-.635 1.004zm-3.691 0l-.635-.462.723-.886-1.13-.344.259-.718 1.056.461-.074-1.186h.827l-.074 1.186 1.078-.461.25.718-1.114.344.753.886-.65.462-.635-1.004-.634 1.004zm-3.692 0l-.635-.462.724-.886-1.13-.344.259-.718 1.055.461-.074-1.186h.827l-.073 1.186 1.077-.461.251.718-1.114.344.753.886-.65.462-.635-1.004-.635 1.004zm-3.691 0l-.635-.462.723-.886-1.13-.344.26-.718 1.055.461-.074-1.186h.827l-.074 1.186 1.078-.461.251.718-1.115.344.753.886-.65.462-.634-1.004-.635 1.004z"
          fill="#FFF"
        />
        <Path
          d="M38.936 39.088a3.05 3.05 0 002.24-.923 3.051 3.051 0 00.924-2.241V8.414c0-.879-.308-1.626-.923-2.241a3.051 3.051 0 00-2.241-.923H5.845a3.05 3.05 0 00-2.241.923 3.051 3.051 0 00-.923 2.241v27.51c0 .879.307 1.626.923 2.241a3.051 3.051 0 002.24.923h33.092zM22.5 18.873h-.044c-.44 0-.806-.161-1.099-.483l-.087-.044L9.229 8.414h26.323l-11.778 9.844-.087.044-.044.088a1.562 1.562 0 01-1.143.483zm16.436 17.05H5.845V9.689L19.16 20.675c.848.847 1.874 1.3 3.08 1.356l.26.006c1.318 0 2.432-.469 3.34-1.406L38.936 9.688v26.236z"
          fill="#1A3686"
        />
      </G>
    </Svg>
  );
}

export function HomeIcon({color = '#1A3686', ...props}) {
  return (
    <Svg
      width={21}
      height={21}
      viewBox="0 0 22 20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G fill={color} fillRule="nonzero">
        <Path d="M21.766 7.9L11.338.112a.563.563 0 00-.676 0L.234 7.899a.59.59 0 00-.124.815c.187.26.545.316.8.126L11 1.305 21.09 8.84a.561.561 0 00.8-.126.59.59 0 00-.124-.815z" />
        <Path d="M19.003 8.972a.577.577 0 00-.572.583v9.279h-4.573v-5.065c0-1.607-1.282-2.915-2.858-2.915s-2.858 1.308-2.858 2.915v5.065H3.569V9.555a.577.577 0 00-.572-.583.577.577 0 00-.571.583v9.862c0 .322.256.583.571.583h5.716a.576.576 0 00.572-.583V13.77c0-.964.77-1.75 1.715-1.75.946 0 1.715.786 1.715 1.75v5.648l.002.045c.023.3.269.538.57.538h5.716a.577.577 0 00.571-.583V9.555a.577.577 0 00-.571-.583z" />
      </G>
    </Svg>
  );
}

export function LogoPVD(props) {
  return (
    <Svg
      width={21}
      height={21}
      viewBox="0 0 22 27"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}>
      <G fill="none" fillRule="evenodd">
        <Text
          fillRule="nonzero"
          fontFamily="Upload-Medium"
          fontSize={8}
          fill="#1A3686"
          transform="translate(.394)">
          <TSpan x={2.526} y={22.636}>
            {'PVD'}
          </TSpan>
        </Text>
        <G transform="translate(.394)">
          <Image
            x={0.543}
            width={19.368}
            height={16}
            xlinkHref="data:image/png;base64,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"
          />
        </G>
      </G>
    </Svg>
  );
}

export function BarChart(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M12.01 11.006l.63 8.213-4.65.631-.63-8.212 4.65-.632zm-.632 1.263H8.622v6.318h2.756V12.27zm7.84-4.234l.632 11.184-4.65.631-.632-11.184 4.65-.631zm-.63 1.262H15.83v9.29h2.756v-9.29zM4.8 13.978l.632 5.24-4.65.632-.632-5.24 4.65-.632zm-.63 1.263H1.412v3.346h2.756v-3.346zM17.208.15l.631 4.524-1.262-2.369-5.338 5.338-3.875-2.982L3.237 8.79 6.92 3.322l3.874 2.982 4.892-4.891h-2.369L17.21.15z"
        fill="#1A3686"
        fillRule="nonzero"
        stroke="#FFF"
        strokeWidth={0.3}
      />
    </Svg>
  );
}

export function Menu(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={13}
      viewBox="0 0 18 13"
      {...props}>
      <G fill="#FFF" fillRule="evenodd">
        <Rect width={18} height={3} rx={1.5} />
        <Rect width={18} height={3} y={10} rx={1.5} />
        <Rect width={11} height={3} y={5} rx={1.5} />
      </G>
    </Svg>
  );
}

export function Setting(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={15}
      height={14}
      viewBox="0 0 15 14"
      {...props}>
      <G fill="#1A3686" fillRule="nonzero">
        <Path d="M14.18 13.977l.149-.149.148-.148c.081-.082-.058-.46-.312-.846l-.652-.99c-.254-.385-.655-.738-.897-.789l-.437-.092L10.215 9l-.715.715 1.962 1.963.093.438c.05.241.405.643.79.897l.99.652c.385.254.764.393.846.312zM.948 3.045l2.995 3.493.374.436c.009.01.017.016.025.026l.495-.577-3.533-4.121a.285.285 0 010-.361.196.196 0 01.31 0l3.531 4.122.551-.644-3.532-4.12a.284.284 0 010-.362c.085-.1.223-.1.308 0L6.006 5.06l.494-.578-.02-.03-.393-.459L3.11.523c-.597-.698-1.566-.697-2.163 0-.597.696-.597 1.825 0 2.522z" />
        <Path d="M14.49 3.026c-.038-.499-.482-.596-.838-.242l-1.245 1.237a.747.747 0 01-1.052 0l-.807-.8a.741.741 0 010-1.05L11.834.893c.357-.353.267-.81-.234-.87a3.299 3.299 0 00-2.72.934 3.255 3.255 0 00-.908 2.909l-6.905 6.862a1.9 1.9 0 00-.566 1.357c0 .512.201.993.565 1.355a1.943 1.943 0 002.73 0s4.965-4.932 6.976-6.932c.316.043.636.04.95-.01a3.28 3.28 0 001.817-.915c.706-.7 1.023-1.64.952-2.557zM3.083 12.85c-.395.39-1.03.39-1.424 0a.993.993 0 01.001-1.412 1.01 1.01 0 011.421 0 .996.996 0 01.002 1.412z" />
      </G>
    </Svg>
  );
}

export function News(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={13}
      viewBox="0 0 14 13"
      {...props}>
      <G fill="#1A3686" fillRule="nonzero">
        <Path d="M10.122 11.776V.408c0-.225-.169-.408-.377-.408H.877C.669 0 .5.183.5.408V10.96c0 1.125.845 2.04 1.884 2.04H10.5a2.141 2.141 0 01-.378-1.224zM2.51 7.833h1.206c.208 0 .377.182.377.408 0 .225-.17.408-.377.408H2.51c-.208 0-.377-.183-.377-.408 0-.226.169-.408.377-.408zM2.133 6.5c0-.225.169-.408.377-.408h1.206c.208 0 .377.183.377.408 0 .225-.17.408-.377.408H2.51c-.208 0-.377-.183-.377-.408zm6.004 4.542H2.51c-.208 0-.377-.183-.377-.408 0-.225.169-.408.377-.408h5.627c.209 0 .377.183.377.408 0 .225-.168.408-.377.408zm.377-2.149c0 .226-.168.408-.377.408H5.324c-.208 0-.377-.182-.377-.408V5.847c0-.225.169-.408.377-.408h2.813c.209 0 .377.183.377.408v3.046zm-.377-4.378H2.51c-.208 0-.377-.183-.377-.408 0-.226.169-.408.377-.408h5.627c.209 0 .377.182.377.408 0 .225-.168.408-.377.408zm0-1.74H2.51c-.208 0-.377-.184-.377-.409 0-.225.169-.408.377-.408h5.627c.209 0 .377.183.377.408 0 .225-.168.408-.377.408z" />
        <Path d="M5.5 6h2v2h-2zm7.545-3H10.5c0 9.053-.001 8.763.003 8.763.04.558.473 1.022 1.059 1.179.937.251 1.897-.345 1.936-1.208.003 0 .002.2.002-8.334 0-.221-.204-.4-.455-.4z" />
      </G>
    </Svg>
  );
}

export function Question(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={15}
      viewBox="0 0 16 15"
      {...props}>
      <G fill="#1A3686" fillRule="nonzero">
        <Path d="M15.5 10.246A4.768 4.768 0 0012.885 6 6.485 6.485 0 016.5 12.385 4.768 4.768 0 0010.746 15c.856 0 1.688-.228 2.419-.66l2.314.64-.64-2.315a4.736 4.736 0 00.661-2.419z" />
        <Path d="M11.5 5.5C11.5 2.467 9.033 0 6 0S.5 2.467.5 5.5c0 .988.263 1.95.763 2.796L.52 10.98l2.684-.743c.845.5 1.808.763 2.796.763 3.033 0 5.5-2.467 5.5-5.5zM5.156 4.22h-.844c0-.93.757-1.688 1.688-1.688a1.69 1.69 0 011.139 2.934l-.717.656v.658h-.844V5.75l.991-.907A.845.845 0 006 3.376a.845.845 0 00-.844.844zm.422 3.404h.844v.844h-.844v-.844z" />
      </G>
    </Svg>
  );
}

export function Download(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={13}
      viewBox="0 0 14 13"
      {...props}>
      <G fill="#1A3686" fillRule="nonzero">
        <Path d="M10.46 5.47a.442.442 0 00-.397-.22h-1.75V.375C8.313.168 8.117 0 7.875 0h-1.75c-.241 0-.437.168-.437.375V5.25h-1.75a.447.447 0 00-.399.22.335.335 0 00.07.402l3.062 3a.47.47 0 00.33.128.472.472 0 00.328-.128l3.063-3a.334.334 0 00.069-.402z" />
        <Path d="M11.767 8v3H2.233V8H.5v4c0 .553.388 1 .867 1h11.266c.48 0 .867-.447.867-1V8h-1.733z" />
      </G>
    </Svg>
  );
}

export function Taxes(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={15}
      viewBox="0 0 14 15"
      {...props}>
      <Path
        d="M8.925 5.746c-2.522 0-4.575 2.076-4.575 4.627C4.35 12.924 6.403 15 8.925 15c2.523 0 4.575-2.076 4.575-4.627 0-2.551-2.052-4.627-4.575-4.627zm-.983 2.791a.64.64 0 01.636.643.641.641 0 01-.636.643.641.641 0 01-.636-.643.64.64 0 01.636-.643zm1.966 3.672a.64.64 0 01-.635-.643.64.64 0 01.635-.643c.35 0 .636.289.636.643a.64.64 0 01-.636.643zm.535-2.687l-2.36 2.386a.473.473 0 01-.676 0 .487.487 0 010-.684l2.36-2.386c.186-.19.49-.19.676 0a.487.487 0 010 .684zM7.64 0H4.53a.484.484 0 00-.419.716l.914 1.687a1.4 1.4 0 00-.496 1.88 4.892 4.892 0 00-3.202 3.716l-.782 4.126C.26 13.618 1.392 15 2.893 15h1.992c.36 0 .537-.443.278-.696-3.066-3.002-1.637-8.213 2.455-9.243a.406.406 0 00.023-.779 1.398 1.398 0 00-.496-1.879L8.06.716A.485.485 0 007.639 0zM6.443 4.022h-.717a.424.424 0 010-.847h.717a.424.424 0 010 .847z"
        fill="#1A3686"
        fillRule="nonzero"
      />
    </Svg>
  );
}

export function Target(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={15}
      viewBox="0 0 16 15"
      {...props}>
      <G fill="#1A3686" fillRule="nonzero">
        <Path d="M7 15a6.5 6.5 0 005.74-9.554c-.053.007-.108.01-.161.01l-.094-.003-.827-.063-.595.594A4.778 4.778 0 112.222 8.5a4.778 4.778 0 017.294-4.062l.538-.538-.073-.949a1.311 1.311 0 01.003-.226A6.5 6.5 0 00.5 8.5 6.5 6.5 0 007 15z" />
        <Path d="M7 6.664c.046 0 .093.002.14.005l1.312-1.312.028-.028A3.5 3.5 0 107 12a3.5 3.5 0 003.171-4.98l-.028.03L8.83 8.36A1.836 1.836 0 117 6.664z" />
        <Path d="M14.287 2.184l.391-.389a.45.45 0 000-.642l-.271-.27a.455.455 0 00-.644-.001l-.449.446-.093-1.187A.151.151 0 0013.067 0a.155.155 0 00-.108.044l-1.764 1.754a.76.76 0 00-.224.6l.005.07.084 1.098-.638.634-1.148 1.14-.026.026L8.136 6.47l-.493.49a.37.37 0 00-.11.241l-.033.385A.384.384 0 007.884 8h.02l.409-.02a.379.379 0 00.252-.112l.49-.485 1.11-1.105.027-.026 1.148-1.14.694-.69 1.008.077.044.003.059.001c.203 0 .4-.08.546-.223l1.763-1.753a.153.153 0 00-.097-.26l-1.071-.083z" />
      </G>
    </Svg>
  );
}

export function PlanRetire(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={14}
      viewBox="0 0 12 14"
      {...props}>
      <G transform="translate(.5)" fill="#1A3686" fillRule="nonzero">
        <Circle cx={8} cy={6} r={1} />
        <Path d="M10.601 1h-.717v1.121c0 .84-.665 1.523-1.482 1.523H2.598c-.817 0-1.482-.683-1.482-1.523V1H.399A.41.41 0 000 1.419V13.58c0 .232.178.419.399.419H10.6a.41.41 0 00.399-.419V1.42a.409.409 0 00-.399-.419zM4.506 11.248a.433.433 0 010 .592.389.389 0 01-.563 0l-.781-.82-.781.82a.387.387 0 01-.564 0 .435.435 0 010-.592l.781-.821-.78-.82a.434.434 0 010-.593.385.385 0 01.563 0l.78.82.782-.82a.385.385 0 01.563 0 .434.434 0 010 .593l-.78.82.78.82zm.144-5.092c-.6 0-1.09.514-1.09 1.145 0 .23-.178.418-.398.418a.409.409 0 01-.399-.418c0-1.093.847-1.982 1.887-1.982.22 0 .398.187.398.419 0 .23-.178.418-.398.418zm1.7 4.69a.409.409 0 01-.398-.419c0-.231.178-.419.398-.419.6 0 1.09-.513 1.09-1.144 0-.231.178-.419.398-.419a.41.41 0 01.399.419c0 1.093-.847 1.982-1.887 1.982zm1.488-3.573c-.806 0-1.461-.689-1.461-1.535 0-.847.655-1.536 1.461-1.536S9.3 4.891 9.3 5.738c0 .846-.656 1.535-1.462 1.535z" />
        <Path d="M8.331 0H2.67A.687.687 0 002 .687v1.65c0 .365.3.663.669.663H8.33c.371 0 .67-.298.67-.663V.687A.687.687 0 008.331 0z" />
      </G>
    </Svg>
  );
}

export function User({color = '#1A3686', ...props}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={13}
      viewBox="0 0 14 13"
      {...props}>
      <Path
        d="M10.98 8.736l-1.976-.71A.434.434 0 008.857 8H5.143c-.05 0-.1.009-.147.026l-1.976.71C1.514 9.274.499 10.79.5 12.5c0 .276.208.5.464.5h12.072c.256 0 .464-.224.464-.5.001-1.709-1.014-3.226-2.52-3.764zM7.5 0c-1.657 0-3 1.175-3 2.625v1.75c.002 1.45 1.344 2.624 3 2.625 1.656-.001 2.998-1.176 3-2.625v-1.75C10.5 1.175 9.157 0 7.5 0z"
        fill={color}
        fillRule="nonzero"
      />
    </Svg>
  );
}

export function CheckGradient(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={12}
      viewBox="0 0 12 12"
      {...props}>
      <Defs>
        <LinearGradient id="prefix__a" x1="100%" x2="0%" y1="50%" y2="50%">
          <Stop offset="0%" stopColor="#1A3585" />
          <Stop offset="100%" stopColor="#1B5EB2" />
        </LinearGradient>
      </Defs>
      <G fillRule="nonzero" fill="none">
        <Path
          fill="url(#prefix__a)"
          d="M6 0C2.691 0 0 2.691 0 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6z"
        />
        <Path
          fill="#FAFAFA"
          d="M9.041 4.729l-3.25 3.25a.502.502 0 01-.707-.001L3.459 6.353a.499.499 0 11.707-.706l1.271 1.271 2.897-2.896a.5.5 0 01.707.707z"
        />
      </G>
    </Svg>
  );
}

export function Company(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}>
      <G fill="none" fillRule="evenodd">
        <Circle
          cx={11}
          cy={11}
          r={11}
          fill={
            props.backgroundColor === undefined
              ? 'transparent'
              : props.backgroundColor
          }
          stroke="#FFF"
          transform="translate(1 1)"
        />
        <G filter="url(#prefix__a)" transform="translate(1 1)">
          <G fill="#FFF" fillRule="nonzero">
            <Path d="M12.583 8.863l4.772.955a.804.804 0 01.645.796v5.567a.815.815 0 01-.813.819h-4.873c.151 0 .27-.12.27-.273v-.273h4.604c.147 0 .271-.12.271-.273v-5.567a.273.273 0 00-.21-.267l-4.665-.928v-.556z" />
            <Path d="M15.563 11.542c.151 0 .27.12.27.273a.269.269 0 01-.27.273h-1.084a.269.269 0 01-.27-.273c0-.153.119-.273.27-.273h1.084zm0 1.638c.151 0 .27.12.27.272a.269.269 0 01-.27.273h-1.084a.269.269 0 01-.27-.273c0-.152.119-.272.27-.272h1.084zm0 1.637c.151 0 .27.12.27.273a.269.269 0 01-.27.273h-1.084a.269.269 0 01-.27-.273c0-.153.119-.273.27-.273h1.084zm-2.98 1.91a.269.269 0 01-.27.273.27.27 0 01-.271-.273V9.086c0-.082.038-.158.097-.213a.285.285 0 01.228-.054l.216.044v7.864z" />
            <Path d="M12.042 16.454v.273c0 .153.119.273.27.273h-2.166c.152 0 .27-.12.27-.273v-.273h1.626zM10.688 6.63c.151 0 .27.12.27.273a.269.269 0 01-.27.273H9.604a.268.268 0 01-.27-.273c0-.153.119-.273.27-.273h1.083zm.27 1.91a.269.269 0 01-.27.273H9.604a.268.268 0 01-.27-.272c0-.153.119-.273.27-.273h1.083a.27.27 0 01.271.273zm-.27 1.365c.151 0 .27.12.27.273a.269.269 0 01-.27.273H9.604a.268.268 0 01-.27-.273c0-.153.119-.273.27-.273h1.083zm0 1.637c.151 0 .27.12.27.273a.269.269 0 01-.27.273H9.604a.268.268 0 01-.27-.273c0-.153.119-.273.27-.273h1.083zm-2.438.273a.27.27 0 01-.27.273H6.895a.27.27 0 01-.271-.273.27.27 0 01.27-.273H7.98a.27.27 0 01.271.273zM7.98 6.63c.15 0 .27.12.27.273a.27.27 0 01-.27.273H6.895a.27.27 0 01-.271-.273.27.27 0 01.27-.273H7.98zm0 1.638c.15 0 .27.12.27.273a.27.27 0 01-.27.272H6.895a.269.269 0 01-.271-.272.27.27 0 01.27-.273H7.98zm0 1.637c.15 0 .27.12.27.273a.27.27 0 01-.27.273H6.895a.27.27 0 01-.271-.273.27.27 0 01.27-.273H7.98zm1.895 4.093a.273.273 0 00-.27-.273H7.978c-.151 0-.27.12-.27.273v2.456h-.542v-2.456c0-.453.363-.818.812-.818h1.625c.45 0 .813.365.813.818v2.456h-.542v-2.456z" />
            <Path d="M7.708 16.454h2.709v.273a.27.27 0 01-.271.273H7.438a.27.27 0 01-.271-.273v-.273h.541z" />
            <Path d="M5.948 4.01l5.952.913a.814.814 0 01.682.808v3.133l-.216-.044a.285.285 0 00-.228.054.29.29 0 00-.097.213V5.73a.276.276 0 00-.228-.273L5.861 4.55c-.016-.005-.031-.005-.048-.005a.255.255 0 00-.174.066.262.262 0 00-.097.207v11.363c0 .153.124.273.27.273h1.355v.273c0 .153.119.273.27.273H5.813A.814.814 0 015 16.181V4.818c0-.24.103-.468.287-.622a.806.806 0 01.66-.185z" />
          </G>
        </G>
      </G>
    </Svg>
  );
}
export function Fund(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}>
      <G fill="none" fillRule="evenodd">
        <Circle
          cx={11}
          cy={11}
          r={11}
          fill="transparent"
          stroke="#FFF"
          transform="translate(1 1)"
        />
        <G fill="#FFF" fillRule="nonzero">
          <Path d="M18.925 7.196a.546.546 0 00-.358-.256l-7.93-1.93a.538.538 0 00-.61.347L7.006 13.11l1.009.371 2.864-7.371 6.89 1.776c-.43 1.346-1.454 4.158-2.436 6.775-.856 2.284-1.348 3.066-2.284 3.226l-.002-.004c-1.913.27-1.879-2.192-1.879-2.192L5.058 13.2c-.433 2.778 1.681 3.446 1.681 3.446l4.473 2.05c.001.001.7.337 1.458.303 2.047-.05 2.766-1.55 3.668-3.954a285.498 285.498 0 002.637-7.41.543.543 0 00-.05-.438z" />
          <Path d="M15.31 10.323a.54.54 0 00.66-.38.543.543 0 00-.377-.666l-2.328-.725a.537.537 0 00-.66.38.544.544 0 00.378.666l2.327.725zm-3.637.78a.546.546 0 00.34.687l2.315.835a.54.54 0 00.68-.342.544.544 0 00-.34-.687l-2.314-.834a.536.536 0 00-.68.341zm-.203 1.922a.533.533 0 00-.678.346.543.543 0 00.343.683l2.32.832a.538.538 0 00.678-.345.543.543 0 00-.343-.685l-2.32-.831zm-.086-5.105c.329 0 .595.261.595.584a.59.59 0 01-.595.585.59.59 0 01-.596-.585.59.59 0 01.596-.585zm-.843 2.173a.59.59 0 01.596.584.59.59 0 01-.596.584.59.59 0 01-.596-.584.59.59 0 01.596-.584zm-.898 2.242a.59.59 0 01.596.585.59.59 0 01-.596.584.59.59 0 01-.596-.584.59.59 0 01.596-.585z" />
        </G>
      </G>
    </Svg>
  );
}

export function MultipleUsers(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={21}
      viewBox="0 0 25 21"
      {...props}>
      <Path
        d="M15.086 3.604A4.533 4.533 0 0117.2 6.973a3.662 3.662 0 005.216-3.314A3.663 3.663 0 0018.75 0a3.663 3.663 0 00-3.664 3.604zm-2.402 7.494c2.026 0 3.667-1.639 3.667-3.66s-1.642-3.66-3.667-3.66a3.665 3.665 0 00-3.667 3.66 3.665 3.665 0 003.667 3.66zm1.556.25h-3.112a4.695 4.695 0 00-4.694 4.685v3.798l.01.06.262.082c2.47.77 4.616 1.027 6.383 1.027 3.45 0 5.45-.982 5.573-1.045l.245-.123h.026v-3.799a4.695 4.695 0 00-4.693-4.686zm6.066-3.779h-3.087a4.511 4.511 0 01-1.395 3.142c2.3.683 3.984 2.812 3.984 5.328v1.17c3.049-.111 4.805-.973 4.92-1.031l.246-.124H25v-3.8a4.695 4.695 0 00-4.694-4.685zM6.25 7.32c.717 0 1.384-.208 1.95-.564a4.533 4.533 0 011.705-2.889c.004-.068.01-.136.01-.205A3.66 3.66 0 006.252 0a3.663 3.663 0 00-3.668 3.66 3.663 3.663 0 003.667 3.659zm3.293 3.392a4.511 4.511 0 01-1.394-3.124c-.115-.009-.228-.018-.345-.018h-3.11A4.695 4.695 0 000 12.255v3.798l.01.059.262.082c1.982.618 3.75.902 5.286.992v-1.147c.001-2.516 1.684-4.645 3.986-5.328z"
        fill="#1A3686"
        fillRule="nonzero"
      />
    </Svg>
  );
}

export function Filter(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={31}
      height={36}
      viewBox="0 0 31 36"
      {...props}>
      <G fill="#FFF" transform="translate(7 12)">
        <Rect width={17} height={2} rx={1} />
        <Rect width={13} height={2} x={2} y={5} rx={1} />
        <Rect width={9} height={2} x={4} y={10} rx={1} />
      </G>
    </Svg>
  );
}

export function SearchDocument(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      {...props}>
      <Defs></Defs>
      <G
        filter="url(#prefix__a)"
        transform="translate(-347 -589)"
        fill="none"
        fillRule="evenodd">
        <G fill="#1a3686" fillRule="nonzero">
          <Path d="M358.198 603.297c0 .364-.297.66-.663.66h-8.822a.663.663 0 01-.663-.66v-12.594c0-.364.298-.66.663-.66l6.073-.005v2.23c0 .652.532 1.182 1.188 1.182l2.199-.006.002.71c.39.168.752.397 1.073.681v-1.805l-4.07-4.03h-6.464c-.944 0-1.714.764-1.714 1.703v12.594a1.71 1.71 0 001.713 1.703h8.822c.84 0 1.538-.607 1.682-1.402l-1.022-1.342.003 1.041z" />
          <Path d="M362.614 602.702l-2.504-2.56a4.17 4.17 0 01-1.726 1.474l2.168 2.847a1.363 1.363 0 001.974.21c.285-.243.456-.593.472-.967a1.344 1.344 0 00-.384-1.004zm-6.03-8.342c-.8 0-1.603.273-2.256.83a3.436 3.436 0 00-.37 4.856 3.47 3.47 0 002.63 1.197c.8 0 1.603-.272 2.256-.83a3.433 3.433 0 00.37-4.855 3.468 3.468 0 00-2.63-1.198zm1.5 5.175c-.433.37-.966.55-1.496.55a2.3 2.3 0 01-1.745-.794 2.278 2.278 0 01.245-3.222c.433-.37.967-.55 1.497-.55.648 0 1.291.269 1.745.794a2.28 2.28 0 01-.245 3.222z" />
          <Path d="M355.847 596.48a.382.382 0 00-.337.078c-.69.59-.77 1.627-.177 2.314a.383.383 0 00.323.126c.08-.005.16-.03.225-.086a.384.384 0 00.043-.544.863.863 0 01.093-1.224.388.388 0 00.042-.545.392.392 0 00-.212-.12z" />
        </G>
      </G>
    </Svg>
  );
}

export function DownloadBold(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      {...props}>
      <G fill="#1A3686" fillRule="nonzero">
        <Path d="M12.26 6.732a.55.55 0 00-.49-.27H9.614v-6c0-.255-.24-.462-.538-.462H6.923c-.297 0-.538.207-.538.462v6H4.23a.55.55 0 00-.49.27.41.41 0 00.085.495l3.77 3.692c.101.1.249.158.404.158a.581.581 0 00.405-.158l3.77-3.692a.409.409 0 00.084-.495z" />
        <Path d="M13.867 9.846v3.692H2.133V9.846H0v4.923C0 15.45.478 16 1.067 16h13.866c.59 0 1.067-.55 1.067-1.23V9.845h-2.133z" />
      </G>
    </Svg>
  );
}
export function Upload(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={26}
      height={25}
      viewBox="0 0 26 25"
      {...props}>
      <G fill="#1A3686" fillRule="nonzero">
        <Path d="M8.32 7.71l3.498-3.58v14.821c0 .669.53 1.21 1.182 1.21.653 0 1.182-.541 1.182-1.21V4.131l3.497 3.58a1.167 1.167 0 001.672-.001 1.23 1.23 0 000-1.71L13.836.354a1.099 1.099 0 00-.087-.081l-.04-.03c-.018-.014-.035-.028-.053-.04-.016-.012-.033-.021-.05-.032l-.05-.03c-.016-.009-.034-.016-.051-.025l-.053-.025-.051-.02-.058-.02-.052-.013-.06-.016-.06-.009-.054-.008a1.351 1.351 0 00-.11-.006h-.014c-.036 0-.073.002-.11.006l-.053.008c-.02.003-.04.005-.06.01-.02.003-.04.01-.06.014l-.053.014-.056.02-.053.02-.051.024-.054.027-.047.028a.569.569 0 00-.052.033c-.017.011-.033.025-.05.037-.014.011-.03.021-.043.033-.029.024-.056.05-.083.077l-.004.003L6.65 6a1.231 1.231 0 000 1.711c.462.472 1.21.472 1.671 0z" />
        <Path d="M24.818 12.097c-.652 0-1.182.541-1.182 1.21v9.274H2.364v-9.275c0-.668-.53-1.21-1.182-1.21-.653 0-1.182.542-1.182 1.21V23.79C0 24.458.53 25 1.182 25h23.636c.653 0 1.182-.542 1.182-1.21V13.306c0-.668-.53-1.21-1.182-1.21z" />
      </G>
    </Svg>
  );
}

export function ReportPVD({fill = '#1A3686', children, ...props}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={14}
      viewBox="0 0 12 14"
      {...props}>
      <G fill={fill} fillRule="nonzero">
        <Path d="M9.437 11a.938.938 0 00-.937.937V14l3-3H9.437z" />
        <Path d="M2.5 2v10.235c0 .97.71 1.765 1.579 1.765h4.105v-1.941c0-.97.71-1.765 1.579-1.765H11.5V2h-9zm4.736 7.147H4.395v-.882h2.841v.882zm2.369-2.118h-5.21v-.882h5.21v.882zm0-2.117h-5.21v-.883h5.21v.883z" />
        <Path d="M.5 0v10.243c0 .912.626 1.667 1.42 1.757V.883H9.5V0h-9z" />
      </G>
    </Svg>
  );
}

export function ChangeAccumulateIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      {...props}>
      <G
        filter="url(#prefix__a)"
        transform="translate(-17 -536)"
        fill="none"
        fillRule="evenodd">
        <G fill={'#1A3686'} fillRule="nonzero">
          <Path d="M34.842 548.275l-2.217 2.899c-.443.58-1.131.92-1.861.92h-4.116a.586.586 0 010-1.172h3.567c.767 0 1.409-.628 1.394-1.394a1.366 1.366 0 00-1.367-1.34h-4.101a3.394 3.394 0 00-4.325-.316l-.441.316v6.64h10.19c1.196 0 2.31-.608 2.957-1.614l2.287-3.557a1.2 1.2 0 00.191-.65c0-1.151-1.46-1.645-2.158-.732zm-15.225-1.259h-2.031a.586.586 0 00-.586.586v7.812c0 .324.262.586.586.586h2.031a.586.586 0 00.586-.586v-7.812a.586.586 0 00-.586-.586zm8.567-7.778a.576.576 0 00-.207.35c-.032.166.008.32.1.392.033.026.069.05.107.075v-.817z" />
          <Path d="M28.602 545.766c2.692 0 4.882-2.19 4.882-4.883S31.294 536 28.602 536a4.888 4.888 0 00-4.883 4.883 4.889 4.889 0 004.883 4.883zm-1.479-3.287a.392.392 0 01.541-.113c.211.138.343.198.52.223v-1.65a2.854 2.854 0 01-.589-.344c-.324-.254-.472-.696-.386-1.151.093-.497.44-.893.902-1.032l.073-.02v-.244a.39.39 0 01.781 0v.2c.38.066.648.253.777.402a.39.39 0 01-.586.516.534.534 0 00-.19-.113v1.262l.206.075c.687.243 1.068.878.95 1.582a1.59 1.59 0 01-1.157 1.265v.28a.39.39 0 11-.781 0v-.242c-.315-.027-.577-.113-.947-.355a.39.39 0 01-.114-.54z" />
          <Path d="M29.352 541.942c.025-.153.036-.516-.387-.694v1.254a.808.808 0 00.387-.56z" />
        </G>
      </G>
    </Svg>
  );
}

export function ChangeInfo(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={13}
      viewBox="0 0 14 13"
      {...props}>
      <G fill="#203B89" fillRule="nonzero">
        <Path d="M10.5 6c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2zm-7-6c-1.103 0-2 .918-2 2.013C1.5 3.11 2.397 4 3.5 4s2-.891 2-1.987C5.5.918 4.603 0 3.5 0zm8.963 3.438a.372.372 0 00-.336-.226h-.395C11.546 1.422 10.12 0 8.392 0H6.873C6.667 0 6.5.178 6.5.398c0 .22.167.398.373.398 1.315 0 2.431 1.067 2.613 2.416h-.347a.373.373 0 00-.337.226.423.423 0 00.045.422l1.494 1.99c.071.095.178.15.292.15.113 0 .22-.055.292-.15l1.493-1.99a.421.421 0 00.045-.422zm-5.336 8.765c-1.315 0-2.431-1.069-2.613-2.42h.347a.372.372 0 00.337-.225.423.423 0 00-.045-.422L3.659 7.142a.37.37 0 00-.584 0L1.582 9.136a.42.42 0 00-.045.422.372.372 0 00.336.226h.395C2.454 11.576 3.88 13 5.608 13h1.519c.206 0 .373-.178.373-.399 0-.22-.167-.398-.373-.398zM12.593 10a3.234 3.234 0 01-2.093.744A3.234 3.234 0 018.407 10c-.557.473-.907 1.156-.907 1.884v.744c0 .206.192.372.429.372h5.142c.237 0 .429-.166.429-.372v-.744c0-.728-.35-1.41-.907-1.884z" />
        <Path d="M5.593 4a3.222 3.222 0 01-2.093.75A3.222 3.222 0 011.407 4C.85 4.477.5 5.14.5 5.875v.75C.5 6.832.692 7 .929 7H6.07c.238 0 .43-.168.43-.375v-.75c0-.735-.35-1.398-.907-1.875z" />
      </G>
    </Svg>
  );
}

export function RetireCheck(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={14}
      viewBox="0 0 16 14"
      {...props}>
      <G fill="#1A3686" fillRule="nonzero">
        <Path d="M8.65 0C7.195 0 5.806.46 4.63 1.33c-.134.1-.17.29-.084.434L5.65 3.592a.316.316 0 00.457.093c.687-.51 1.5-.778 2.35-.778 2.208 0 4.005 1.836 4.005 4.093 0 2.257-1.797 4.093-4.005 4.093-.85 0-1.663-.269-2.35-.778a.314.314 0 00-.457.093l-1.103 1.828a.33.33 0 00.084.433A6.702 6.702 0 008.65 14c3.777 0 6.85-3.14 6.85-7s-3.073-7-6.85-7z" />
        <Path d="M5.221 8.847a.251.251 0 00-.017-.298l-.807-1.022h4.886c.671 0 1.217-.46 1.217-1.027 0-.566-.546-1.027-1.217-1.027H4.397l.807-1.022a.253.253 0 00.017-.298A.36.36 0 004.918 4H2.59a.361.361 0 00-.286.13L.558 6.338a.253.253 0 000 .322l1.746 2.21c.064.08.171.129.286.129h2.328a.358.358 0 00.303-.153z" />
      </G>
    </Svg>
  );
}

export function SummaryEvaluation(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={13}
      height={14}
      viewBox="0 0 13 14"
      {...props}>
      <G fill="#203B89" fillRule="nonzero">
        <Path d="M10.437 11a.938.938 0 00-.937.937V14l3-3h-2.063z" />
        <Path d="M.5 0v12.108C.5 13.148 1.385 14 2.467 14H8.37v-2.081c0-1.04.885-1.892 1.967-1.892H12.5V0H.5zm6.098 3.31h3.542v.947H6.6V3.31zm-2.83 5.314l-1.202-.867-.394-.284.59-.757.765.551 1.164-1.68.819.525-1.742 2.512zm0-3.405L2.566 4.35l-.394-.284.59-.757.765.552 1.164-1.68.819.524L3.768 5.22zm2.83 2.443v-.946h3.542v.946H6.6z" />
      </G>
    </Svg>
  );
}

export function SummaryInvestReport(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={14}
      viewBox="0 0 12 14"
      {...props}>
      <G fill="none" fillRule="evenodd">
        <G fill="#1A3686">
          <G fillRule="nonzero">
            <Path d="M1.77 14h8.46c.7 0 1.27-.552 1.27-1.23V4.102H8.538c-.7 0-1.269-.552-1.269-1.23V0h-5.5C1.07 0 .5.552.5 1.23v11.54c0 .678.57 1.23 1.27 1.23zm1.692-8.23h5.076c.234 0 .424.183.424.41 0 .226-.19.41-.424.41H3.462a.418.418 0 01-.424-.41c0-.227.19-.41.424-.41zm0 1.64h5.076c.234 0 .424.184.424.41 0 .227-.19.41-.424.41H3.462a.417.417 0 01-.424-.41c0-.226.19-.41.424-.41zm0 1.64h5.076c.234 0 .424.184.424.41 0 .228-.19.411-.424.411H3.462a.417.417 0 01-.424-.41c0-.227.19-.41.424-.41zm0 1.641h3.384c.234 0 .423.184.423.41 0 .227-.189.41-.423.41H3.462a.417.417 0 01-.424-.41c0-.226.19-.41.424-.41z" />
            <Path d="M8.543 3.246h2.745L8.115.203v2.633c0 .226.192.41.428.41z" />
          </G>
          <Path d="M2.5 5h7v7h-7z" />
        </G>
        <G fill="#FFF" fillRule="nonzero">
          <Path d="M9.421 9.59L8.11 8.548a.228.228 0 00-.233-.028.206.206 0 00-.126.188v.625h-.366a.88.88 0 01-.742-.391L5.225 6.783A1.76 1.76 0 003.741 6H2.5v.833h1.241c.304 0 .581.147.742.392L5.9 9.383c.322.49.877.784 1.484.784h.366v.625c0 .08.049.154.126.188a.224.224 0 00.233-.028L9.42 9.91a.202.202 0 000-.32z" />
          <Path d="M9.414 6.295L7.988 5.057a.234.234 0 00-.254-.034.248.248 0 00-.136.224v.743h-.399c-.66 0-1.263.349-1.613.932l-.086.143.56.935.333-.553a.936.936 0 01.806-.466h.399v.743c0 .096.053.184.136.224a.227.227 0 00.254-.034l1.426-1.238a.25.25 0 00.086-.19.245.245 0 00-.086-.19zM4.948 8l-.326.55a.923.923 0 01-.794.464H2.5V10h1.328c.65 0 1.243-.347 1.587-.927L5.5 8.93 4.948 8z" />
        </G>
      </G>
    </Svg>
  );
}

export function Lock(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={11}
      height={15}
      viewBox="0 0 11 15"
      {...props}>
      <Path
        d="M9.625 5.625h-.458V3.75C9.167 1.682 7.522 0 5.5 0S1.833 1.682 1.833 3.75v1.875h-.458C.617 5.625 0 6.255 0 7.031v6.563C0 14.369.617 15 1.375 15h8.25c.758 0 1.375-.63 1.375-1.406V7.03c0-.775-.617-1.406-1.375-1.406zM3.055 3.75c0-1.379 1.097-2.5 2.445-2.5 1.348 0 2.444 1.121 2.444 2.5v1.875H3.056V3.75zm3.056 6.701v1.424a.618.618 0 01-.611.625.618.618 0 01-.611-.625v-1.424a1.25 1.25 0 01-.611-1.076c0-.69.548-1.25 1.222-1.25.674 0 1.222.56 1.222 1.25 0 .46-.247.86-.61 1.076z"
        fill="#1A3686"
        fillRule="nonzero"
      />
    </Svg>
  );
}

export function Globe(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={15}
      viewBox="0 0 16 15"
      {...props}>
      <Path
        d="M8 7V4.582A8.136 8.136 0 015.42 4c-.24.921-.384 1.938-.42 3h3zm0 3.418V8H5c.036 1.062.18 2.079.42 3A8.136 8.136 0 018 10.418zM6 3.532c.634.262 1.307.42 2 .468V1c-.961.308-1.632 1.528-2 2.532zm4 7.936A6.382 6.382 0 008 11v3c.961-.308 1.632-1.528 2-2.532zM3.473 7c.04-1.248.221-2.448.527-3.53A9.145 9.145 0 011.984 2 8.546 8.546 0 000 7h3.473zm9.054 1A14.808 14.808 0 0112 11.53 9.145 9.145 0 0114.016 13 8.546 8.546 0 0016 8h-3.473zM3.473 8H0a8.546 8.546 0 001.984 5A9.145 9.145 0 014 11.53 14.86 14.86 0 013.473 8zM8 14v-3a6.354 6.354 0 00-2 .468c.368 1.006 1.04 2.224 2 2.532zm3.415-2c-.484 1.18-1.271 2.41-2.415 3a8.055 8.055 0 004-1.887A7.934 7.934 0 0011.415 12zm-6.83 0c-.568.302-1.1.675-1.585 1.113A8.063 8.063 0 007 15c-1.144-.59-1.931-1.82-2.415-3zm0-9C5.069 1.82 5.856.59 7 0a8.055 8.055 0 00-4 1.887c.485.438 1.017.81 1.585 1.113zM8 8v2.418a8.136 8.136 0 012.58.582c.24-.921.384-1.938.42-3H8zm4-4.53A14.86 14.86 0 0112.527 7H16a8.546 8.546 0 00-1.984-5A9.145 9.145 0 0112 3.47zM8 4.582V7h3a13.836 13.836 0 00-.42-3A8.136 8.136 0 018 4.582zM8 1v3a6.354 6.354 0 002-.468C9.632 2.526 8.96 1.308 8 1zm1-1c1.144.59 1.931 1.82 2.415 3A7.894 7.894 0 0013 1.887 8.063 8.063 0 009 0z"
        fill="#1A3686"
        fillRule="nonzero"
      />
    </Svg>
  );
}

export function Logout(props) {
  return (
    <Svg
      width={17}
      height={16}
      viewBox="0 0 17 16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G fill="#1A3686" fillRule="nonzero">
        <Path d="M10.813 8.667a.677.677 0 00-.688.666V12a.678.678 0 01-.688.667H7.375v-10c0-.57-.374-1.078-.936-1.268l-.204-.066h3.202c.38 0 .688.3.688.667v2c0 .368.307.667.688.667.38 0 .687-.3.687-.667V2c0-1.103-.925-2-2.063-2h-7.39c-.026 0-.048.011-.074.015C1.94.012 1.91 0 1.875 0 1.117 0 .5.598.5 1.333v12c0 .57.374 1.078.936 1.268l4.138 1.337c.14.042.28.062.426.062.758 0 1.375-.598 1.375-1.333V14h2.062c1.138 0 2.063-.897 2.063-2V9.333a.677.677 0 00-.687-.666z" />
        <Path d="M16.313 6.005l-2.545-2.8a.595.595 0 00-.694-.152.705.705 0 00-.392.647v2.1h-2.546c-.35 0-.636.314-.636.7 0 .386.285.7.636.7h2.546v2.1c0 .283.155.538.392.647a.595.595 0 00.694-.152l2.545-2.8a.75.75 0 000-.99z" />
      </G>
    </Svg>
  );
}

export function DuoUsers({fill = '#C3C9D9', ...props}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={21}
      viewBox="0 0 20 21"
      {...props}>
      <Text
        transform="translate(-198 -1165)"
        fill={fill}
        fillRule="evenodd"
        fontFamily="simple-line-icons"
        fontSize={20}>
        <TSpan x={198} y={1184}>
          {'\uE001'}
        </TSpan>
      </Text>
    </Svg>
  );
}

export function PadLock(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={36}
      height={47}
      viewBox="0 0 36 47"
      {...props}>
      <G fill="#1A3686" fillRule="nonzero">
        <Path d="M18 26.589a3.55 3.55 0 00-3.554 3.54 3.549 3.549 0 002.629 3.419v5.092a.924.924 0 001.85 0v-5.092a3.55 3.55 0 002.629-3.418A3.551 3.551 0 0018 26.589zm0 5.238c-.94 0-1.704-.761-1.704-1.697s.764-1.698 1.704-1.698 1.704.762 1.704 1.698c0 .936-.764 1.697-1.704 1.697z" />
        <Path d="M30.49 16.686h-2.076v-6.311C28.414 4.655 23.742 0 18 0 12.257 0 7.586 4.654 7.586 10.375v6.31H5.51C2.472 16.686 0 19.149 0 22.176V41.51C0 44.537 2.472 47 5.51 47h24.98c3.038 0 5.51-2.463 5.51-5.49V22.175c0-3.027-2.472-5.49-5.51-5.49zM9.435 10.375c0-4.705 3.842-8.532 8.564-8.532 4.722 0 8.564 3.827 8.564 8.532v6.31h-2.609v-6.31c0-3.272-2.671-5.934-5.955-5.934-3.284 0-5.956 2.662-5.956 5.934v6.31H9.436v-6.31zm12.67 0v6.31h-8.211v-6.31c0-2.256 1.841-4.09 4.105-4.09 2.264 0 4.105 1.834 4.105 4.09zM34.15 41.51a3.658 3.658 0 01-3.66 3.647H5.51a3.658 3.658 0 01-3.66-3.647V22.175a3.658 3.658 0 013.66-3.646h24.98a3.658 3.658 0 013.66 3.646V41.51z" />
      </G>
    </Svg>
  );
}

export function TouchId(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={62}
      height={62}
      viewBox="0 0 62 62"
      {...props}>
      <Defs>
        <Path id="prefix__a" d="M0 0h9.486v18.713H0z" />
        <Path id="prefix__c" d="M0 0h20.751v6.023H0z" />
      </Defs>
      <G transform="translate(1 1)" fill="none" fillRule="evenodd">
        <Path
          fill="#1A3686"
          d="M14.448 49.07a1.594 1.594 0 01-1.425-.855 1.45 1.45 0 01.189-1.593 25.17 25.17 0 001.307-1.697c.335-.45.643-.919.926-1.4.428-.728 1.393-.986 2.156-.579.762.407 1.034 1.325.607 2.051-.311.533-.65 1.05-1.016 1.548a30.535 30.535 0 01-1.503 1.96 1.615 1.615 0 01-1.24.564m4.575-9.717c-.15 0-.3-.02-.444-.06a1.608 1.608 0 01-.973-.745 1.53 1.53 0 01-.143-1.194l.172-.598c.2-.73.368-1.47.502-2.215.138-.75.242-1.517.31-2.276.067-.76.103-1.563.103-2.335 0-.743.077-1.483.232-2.212a10.738 10.738 0 011.706-3.922c.407-.582.87-1.126 1.385-1.623a11.38 11.38 0 013.602-2.352 11.797 11.797 0 014.415-.872c.895 0 1.62.702 1.62 1.57 0 .865-.725 1.568-1.62 1.568a8.201 8.201 0 00-5.725 2.291 7.81 7.81 0 00-1.736 2.495 7.374 7.374 0 00-.473 1.473 7.548 7.548 0 00-.166 1.584c0 .863-.04 1.74-.117 2.606-.077.868-.19 1.707-.345 2.547a28.251 28.251 0 01-.748 3.13 1.611 1.611 0 01-1.557 1.14m18.775 2.915a1.527 1.527 0 01-1.295-.738 1.572 1.572 0 01-.184-1.17 46.158 46.158 0 00.839-4.574 45.442 45.442 0 00.385-5.96 7.79 7.79 0 00-1.292-4.326 7.73 7.73 0 00-1.215-1.424 1.57 1.57 0 01-.468-1.473c.113-.54.5-.98 1.017-1.15a1.5 1.5 0 011.486.322 10.862 10.862 0 013.294 5.855c.145.723.218 1.458.217 2.195a49.892 49.892 0 01-.407 6.368 43.443 43.443 0 01-.508 3.097c-.12.6-.25 1.198-.387 1.792a1.525 1.525 0 01-1.482 1.186m-5.21 13.118a1.58 1.58 0 01-1.37-.794 1.595 1.595 0 010-1.59 46.496 46.496 0 002.546-5.235l.245-.61a1.573 1.573 0 012.705-.398c.35.445.437 1.045.228 1.573l-.261.653c-.396.962-.82 1.91-1.274 2.844a48.392 48.392 0 01-1.444 2.746c-.28.5-.805.81-1.375.81"
        />
        <Path
          fill="#1A3686"
          d="M24.496 56.842a1.553 1.553 0 01-1.374-.848 1.6 1.6 0 01.1-1.63l1.337-1.959c.54-.79 1.058-1.62 1.535-2.447a39.443 39.443 0 004.298-10.893c.224-.973.418-1.964.567-2.95.15-.985.272-2.024.349-3.026a41.24 41.24 0 00.12-3.089c0-.106-.01-.21-.032-.315a1.57 1.57 0 00-1.21-1.234 1.541 1.541 0 00-1.178.233c-.083.06-.16.124-.233.196a1.547 1.547 0 00-.423.792 1.651 1.651 0 00-.033.328c0 .873-.696 1.58-1.554 1.58-.858 0-1.553-.707-1.553-1.58 0-.32.03-.643.095-.959a4.688 4.688 0 01.705-1.693c.166-.25.357-.486.569-.7.21-.213.44-.406.687-.574.248-.172.513-.319.79-.437a4.6 4.6 0 013.635.001c.83.36 1.543.958 2.048 1.718.342.513.58 1.088.7 1.694.063.313.095.631.094.95a43.45 43.45 0 01-.502 6.606 39.642 39.642 0 01-.62 3.192 48.475 48.475 0 01-.842 3.097 42.852 42.852 0 01-1.06 3 43.07 43.07 0 01-2.742 5.663 42.853 42.853 0 01-1.66 2.646l-1.341 1.96a1.55 1.55 0 01-1.271.678"
        />
        <Path
          fill="#1A3686"
          d="M19.44 52.47a1.53 1.53 0 01-1.377-.88 1.597 1.597 0 01.165-1.652 32.112 32.112 0 001.502-2.157c.47-.742.922-1.494 1.332-2.279a35.39 35.39 0 001.157-2.392c.356-.823.675-1.653.963-2.495.287-.842.546-1.727.767-2.59.198-.732.358-1.474.48-2.223a1.566 1.566 0 01.98-1.21 1.51 1.51 0 011.516.263c.422.358.626.92.534 1.473-.167 1.006-.307 1.543-.536 2.482-.228.94-.524 1.91-.84 2.838a35.78 35.78 0 01-2.323 5.357c-.45.843-.947 1.698-1.46 2.496-.513.797-1.074 1.6-1.645 2.354a1.52 1.52 0 01-1.215.614M9.975 44.21c-.616 0-1.18-.32-1.46-.833a1.452 1.452 0 01.122-1.596 19.754 19.754 0 002.356-3.965c.208-.469.397-.948.567-1.436.165-.482.33-.977.452-1.478.123-.5.242-1.016.329-1.538.087-.52.164-1.036.2-1.564.037-.529.063-1.058.063-1.6 0-.849.736-1.536 1.644-1.536.907 0 1.642.687 1.642 1.537a21.831 21.831 0 01-.31 3.654c-.1.597-.232 1.19-.383 1.77a24.121 24.121 0 01-.521 1.71 20.456 20.456 0 01-.657 1.657c-.24.544-.503 1.077-.787 1.596a25 25 0 01-.904 1.523c-.32.496-.658.98-1.023 1.45-.305.405-.8.646-1.33.65m5.95-18.948c-.206 0-.41-.042-.602-.122a1.504 1.504 0 01-.822-1.985c.408-.945.912-1.846 1.507-2.69a17.017 17.017 0 0110.685-7.01 17.56 17.56 0 016.86 0 16.98 16.98 0 016.09 2.51 16.995 16.995 0 012.517 2.032 16.757 16.757 0 012.079 2.467l.205.294a8.485 8.485 0 011.05 1.86 1.49 1.49 0 01-.183 1.51c-.334.435-.88.661-1.43.593a1.542 1.542 0 01-1.236-.923 5.784 5.784 0 00-.757-1.33l-.214-.303a13.943 13.943 0 00-8.746-5.742 14.422 14.422 0 00-5.616 0c-.896.18-1.77.446-2.612.795a13.912 13.912 0 00-6.13 4.944c-.483.681-.893 1.41-1.222 2.174-.24.56-.8.925-1.422.926M41.22 51.498c-.55 0-1.064-.255-1.37-.677a1.42 1.42 0 01-.148-1.427c.329-.74.646-1.49.944-2.246a48.566 48.566 0 001.531-4.637 45.668 45.668 0 001.052-4.816c.133-.816.246-1.64.329-2.469.082-.829.164-1.67.203-2.505.04-.836.08-1.686.08-2.539 0-.839.738-1.518 1.647-1.518.91 0 1.645.68 1.645 1.518 0 .903-.023 1.8-.071 2.69a49.63 49.63 0 01-1.07 7.86 47.682 47.682 0 01-1.378 5.018c-.27.813-.564 1.632-.878 2.43-.312.796-.646 1.6-1.001 2.382-.255.565-.852.934-1.515.936"
        />
        <G transform="translate(6.316 12.815)">
          <Mask id="prefix__b" fill="#fff">
            <Use xlinkHref="#prefix__a" />
          </Mask>
          <Path
            fill="#1A3686"
            d="M1.583 18.713C.71 18.713 0 18.003 0 17.126c-.003-1.61.156-3.217.475-4.796A23.787 23.787 0 016.787.46 1.582 1.582 0 019.011.454c.618.608.635 1.6.037 2.228a20.586 20.586 0 00-5.881 14.444 1.589 1.589 0 01-1.584 1.587"
            mask="url(#prefix__b)"
          />
        </G>
        <G transform="translate(16.601 6.455)">
          <Mask id="prefix__d" fill="#fff">
            <Use xlinkHref="#prefix__c" />
          </Mask>
          <Path
            fill="#1A3686"
            d="M1.572 6.023C.867 6.023.247 5.572.058 4.92c-.19-.655.098-1.35.702-1.7a24.06 24.06 0 012.952-1.444A24.08 24.08 0 018.135.457c3.128-.61 6.352-.61 9.48 0 .685.136 1.356.298 2.017.487.83.24 1.301 1.08 1.052 1.88-.249.797-1.124 1.25-1.954 1.011a21.156 21.156 0 00-1.742-.42 21.518 21.518 0 00-8.226 0c-1.312.26-2.594.642-3.827 1.142-.88.36-1.735.778-2.555 1.252-.244.14-.523.214-.808.214"
            mask="url(#prefix__d)"
          />
        </G>
        <Path
          fill="#1A3686"
          d="M51.16 42.267a1.577 1.577 0 01-1.296-.671 1.55 1.55 0 01-.258-1.169c.075-.417.146-.833.214-1.25.064-.414.126-.836.186-1.26.06-.423.109-.838.157-1.263.05-.425.094-.848.133-1.277.04-.428.074-.853.103-1.283a55.848 55.848 0 00.121-2.59c.01-.436.01-.873.01-1.31-.006-6.652-3.292-12.883-8.802-16.685a1.553 1.553 0 01-.36-2.15 1.586 1.586 0 012.16-.415 23.612 23.612 0 013.226 2.674 23.352 23.352 0 016.449 11.853 23.43 23.43 0 01.48 4.724 57.313 57.313 0 01-.143 4.11c-.03.453-.07.902-.108 1.35-.04.45-.09.898-.14 1.345a54.66 54.66 0 01-.364 2.661c-.07.44-.144.882-.223 1.318a1.573 1.573 0 01-1.545 1.288"
        />
        <Circle cx={30} cy={30} r={30.5} stroke="#1A3686" />
      </G>
    </Svg>
  );
}

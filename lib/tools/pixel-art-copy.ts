import type { ToolCopy } from "./types";

export const pixelArtCopy: Record<string, ToolCopy> = {
  en: {
    title: "Pixel Art Generator",
    description: "Generate pixel art prompts, scene direction, color mood, and production notes for your next indie game.",
    fields: [
      { name: "theme", label: "Theme", placeholder: "Rainy cyber alley with hologram storefronts" },
      { name: "style", label: "Pixel style", placeholder: "16-bit neon city, crisp silhouettes, soft dithering" },
      { name: "palette", label: "Palette", placeholder: "Teal, magenta, violet, deep navy" },
      { name: "resolution", label: "Resolution", placeholder: "32x32 character sprite, 256x144 environment scene" }
    ],
    templates: [
      {
        label: "Puzzle",
        values: {
          theme: "Restoration workshop full of magical relics",
          style: "Pastel 16-bit interiors, soft glow, readable objects",
          palette: "Mint, cream, peach, muted gold",
          resolution: "32x32 characters, 320x180 gameplay mockup"
        }
      },
      {
        label: "RPG",
        values: {
          theme: "Moonlit ruins with ancient statues and drifting fog",
          style: "SNES-inspired fantasy palette, dramatic lighting, layered depth",
          palette: "Indigo, silver, moss green, moonlit blue",
          resolution: "48x48 character sprites, 427x240 environment frame"
        }
      },
      {
        label: "Survival",
        values: {
          theme: "Collapsed rooftop shelter above an overgrown city",
          style: "Muted post-apocalyptic tileset, worn textures, sparse contrast",
          palette: "Dusty olive, rust, concrete gray, faded amber",
          resolution: "64x64 hero sprite, 384x216 environment concept"
        }
      }
    ]
  },
  ko: {
    title: "픽셀 아트 프롬프트 생성기",
    description: "다음 인디 게임을 위한 픽셀 아트 프롬프트, 장면 방향, 색감 분위기, 제작 노트를 생성하세요.",
    fields: [
      { name: "theme", label: "테마", placeholder: "홀로그램 간판이 비치는 비 내리는 사이버 골목" },
      { name: "style", label: "픽셀 스타일", placeholder: "16비트 네온 시티, 선명한 실루엣, 부드러운 디더링" },
      { name: "palette", label: "팔레트", placeholder: "청록, 마젠타, 보라, 짙은 남색" },
      { name: "resolution", label: "해상도", placeholder: "32x32 캐릭터 스프라이트, 256x144 배경 장면" }
    ],
    templates: [
      {
        label: "퍼즐",
        values: {
          theme: "마법 유물로 가득한 복원 공방",
          style: "파스텔 16비트 실내, 은은한 광원, 읽기 쉬운 오브젝트",
          palette: "민트, 크림, 피치, 톤다운 골드",
          resolution: "32x32 캐릭터, 320x180 게임 화면 목업"
        }
      },
      {
        label: "RPG",
        values: {
          theme: "고대 조각상과 안개가 떠도는 달빛 폐허",
          style: "SNES풍 판타지 팔레트, 극적인 조명, 레이어 깊이감",
          palette: "인디고, 실버, 이끼색, 달빛 블루",
          resolution: "48x48 캐릭터 스프라이트, 427x240 배경 프레임"
        }
      },
      {
        label: "서바이벌",
        values: {
          theme: "초목에 뒤덮인 도시 위 무너진 옥상 쉘터",
          style: "절제된 포스트아포칼립스 타일셋, 낡은 질감, 낮은 대비",
          palette: "먼지 낀 올리브, 녹슨 주황, 콘크리트 회색, 바랜 황색",
          resolution: "64x64 주인공 스프라이트, 384x216 환경 콘셉트"
        }
      }
    ]
  }
};

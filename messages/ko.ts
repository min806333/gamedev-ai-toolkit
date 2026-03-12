const koMessages = {
  landing: {
    hero: {
      badge: "인디 스튜디오를 위한 AI 툴킷",
      title: "하나의 워크스페이스에서 게임 아이디어, UI 시스템, 스타터 코드를 생성하세요.",
      description:
        "VertikerAI은 솔로 개발자가 구조화된 AI 워크플로, 프롬프트 템플릿, 스트리밍 응답, 생성 기록을 바탕으로 콘셉트에서 플레이 가능한 MVP까지 빠르게 이동하도록 돕습니다.",
      primaryCta: "무료로 시작",
      secondaryCta: "AI 도구"
    },
    preview: {
      label: "실시간 출력 스트리밍",
      status: "스트리밍",
      codeBlock: `## 미션 기반 로그라이트
- 미드코어 협동 레이드 루프
- 절차 생성 레벨 목표
- 마을 성장 메타

## 추천 MVP
- 바이옴 1개
- 무기 3종
- 보스 변형 2종`,
      workspaceNote: "아이디어, UI, 코드, 기획을 하나의 워크스페이스에서 정리하세요.",
      productionNote: "실제 프로덕션 의사결정에 바로 쓸 수 있는 구조화된 결과를 제공합니다."
    },
    features: {
      label: "기능",
      title: "실제 게임을 출시하는 개발팀을 위해 설계했습니다",
      items: [
        {
          title: "빠른 아이데이션",
          body: "막연한 콘셉트를 며칠이 아닌 몇 분 안에 테스트 가능한 설계 방향으로 바꿉니다."
        },
        {
          title: "UI 중심 기획",
          body: "프로덕션에 들어가기 전에 HUD, 메뉴 구조, 화면 흐름을 먼저 설계합니다."
        },
        {
          title: "엔진 맥락을 이해하는 코드",
          body: "구현 맥락이 포함된 스타터 게임플레이 코드와 Unity 스크립트를 생성합니다."
        },
        {
          title: "프로덕션 문서",
          body: "GDD, 시스템 디자인 문서, MVP 로드맵을 처음부터 다시 쓰지 않아도 됩니다."
        }
      ]
    },
    tools: {
      label: "도구",
      title: "콘셉트에서 로드맵까지 모든 워크플로",
      dashboardCta: "전체 툴킷 열기",
      openTool: "도구 열기",
      items: [
        {
          id: "idea",
          title: "게임 아이디어 생성기",
          description: "장르, 플랫폼, 테마를 완성도 있는 게임 콘셉트로 정리합니다."
        },
        {
          id: "unity-script",
          title: "Unity 스크립트 생성기",
          description: "주석과 통합 노트가 포함된 게임플레이 시스템과 C# 스크립트를 만듭니다."
        },
        {
          id: "ui",
          title: "게임 UI 생성기",
          description: "HUD 구조, 메뉴 계층, 시각적 UX 방향을 생성합니다."
        },
        {
          id: "gdd",
          title: "게임 기획서 생성기",
          description: "범위, 루프, 프로덕션 리스크를 포함한 전체 게임 기획 문서를 초안으로 만듭니다."
        },
        {
          id: "ui-ux-plan",
          title: "UI/UX 기획 생성기",
          description: "게임의 화면, 플로우, HUD 구조, 사용성 가이드를 기획합니다."
        },
        {
          id: "system-design",
          title: "시스템 디자인 생성기",
          description: "성장, 경제, 랭킹, 보상, 라이브 시스템을 구조화합니다."
        },
        {
          id: "mvp-roadmap",
          title: "MVP 로드맵 생성기",
          description: "팀이 실제로 출시할 수 있는 실행 계획으로 기능을 분해합니다."
        }
      ]
    },
    examples: {
      label: "예시 출력",
      title: "팀이 바로 활용할 수 있는 구조화된 결과",
      items: [
        {
          label: "게임 아이디어",
          title: "포근한 유물 머지 어드벤처",
          body: `- 퍼즐 원정으로 떠다니는 박물관을 복원
- 수익화: 시즌 패스 + 코스메틱
- UI: 상단 재화 바, 중앙 머지 보드, 하단 부스터`
        },
        {
          label: "Unity 스크립트",
          title: "플레이어 대시 컨트롤러",
          body: `public class PlayerDash : MonoBehaviour {
  public float dashForce = 12f;
  public float cooldown = 1.5f;
}`
        },
        {
          label: "GDD",
          title: "버티컬 슬라이스 계획",
          body: `- 코어 루프 정의 완료
- MVP 범위: 바이옴 1개, 적 유형 3종, 진행 허브 1개
- 리스크: 온보딩 마찰과 콘텐츠 제작 주기`
        }
      ]
    },
    pricing: {
      label: "가격 미리보기",
      title: "무료로 시작하고 파이프라인이 커질 때 업그레이드하세요",
      viewFullPricing: "전체 요금 보기",
      plans: [
        {
          name: "무료",
          price: "$0",
          detail: "하루 5회 생성",
          items: ["게임 아이디어", "UI 레이아웃", "스타터 코드"]
        },
        {
          name: "Pro",
          price: "$12/월",
          detail: "무제한 생성 + 기획 도구",
          items: ["GDD 생성기", "시스템 디자인", "UI/UX 기획"],
          featured: true
        },
        {
          name: "Studio",
          price: "$29/월",
          detail: "전체 프로덕션 워크플로를 구축하는 팀용",
          items: ["Pro의 모든 기능", "MVP 로드맵", "수익화 기획"]
        }
      ]
    },
    cta: {
      label: "빌드 시작",
      title: "게임 팀의 기획과 프로토타이핑 속도를 높이세요",
      description: "VertikerAI에서 콘셉트, 스크립트, UI 방향, 프로덕션 문서를 한 곳에서 생성하세요.",
      primaryCta: "무료 체험 시작",
      secondaryCta: "로그인"
    }
  }
} as const;

export default koMessages;

import "server-only";
import { createClient } from "@supabase/supabase-js";

// 서버 전용 클라이언트. 인증(매직링크) 플로우는 이번 Must 1~4 범위에 없으므로,
// 서버 컴포넌트/서버 액션에서 서비스 롤 키로 직접 접근한다.
// (CLAUDE.md 7.3: SUPABASE_SERVICE_ROLE_KEY는 서버 액션에서만 사용, 클라이언트 노출 금지)
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Supabase 환경 변수가 설정되지 않았습니다. .env.local에 NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY를 채워주세요."
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}

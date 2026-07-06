export default function IndicatorsEmptyPage() {
  return (
    <div className="h-full flex items-center justify-center text-center">
      <div>
        <p className="font-display text-lg text-ink">왼쪽에서 지표를 선택하세요</p>
        <p className="mt-1 text-sm text-slate">
          지표를 선택하면 담당자·증빙 기준과 이번 보고 주기 체크리스트를 확인할 수 있습니다.
        </p>
      </div>
    </div>
  );
}

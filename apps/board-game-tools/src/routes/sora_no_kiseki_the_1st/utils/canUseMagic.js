// 检查魔法需求是否满足
export default  function canUseMagic(requirement, totals) {
  return (
    (totals.earth >= (requirement.earth || 0)) &&
    (totals.water >= (requirement.water || 0)) &&
    (totals.fire >= (requirement.fire || 0)) &&
    (totals.wind >= (requirement.wind || 0)) &&
    (totals.time >= (requirement.time || 0)) &&
    (totals.space >= (requirement.space || 0)) &&
    (totals.illusion >= (requirement.illusion || 0))
  );
}
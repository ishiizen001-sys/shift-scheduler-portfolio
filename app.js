const staff = [
  { name: "スタッフA", role: "レジ", status: "提出済み" },
  { name: "スタッフB", role: "品出し", status: "提出済み" },
  { name: "スタッフC", role: "サービス", status: "提出済み" },
  { name: "スタッフD", role: "レジ", status: "確認待ち" },
  { name: "スタッフE", role: "品出し", status: "提出済み" },
  { name: "スタッフF", role: "サービス", status: "提出済み" }
];
const coverage = [
  { assigned: 8, required: 8 }, { assigned: 7, required: 8 }, { assigned: 8, required: 8 },
  { assigned: 9, required: 9 }, { assigned: 8, required: 9 }, { assigned: 10, required: 10 },
  { assigned: 9, required: 9 }, { assigned: 8, required: 8 }, { assigned: 8, required: 8 },
  { assigned: 7, required: 8 }, { assigned: 9, required: 9 }, { assigned: 9, required: 9 },
  { assigned: 10, required: 10 }, { assigned: 9, required: 9 }
];
const sections = [{ name: "レジ", value: 82 }, { name: "品出し", value: 74 }, { name: "サービス", value: 91 }];
const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
const pad = n => String(n).padStart(2, "0");
function render() {
  const start = new Date(`${document.querySelector("#startDate").value}T00:00:00`);
  const shortage = coverage.reduce((sum, d) => sum + Math.max(0, d.required - d.assigned), 0);
  document.querySelector("#metrics").innerHTML = [
    ["希望提出率", "83%", "5 / 6名が提出済み"], ["充足日", `${coverage.filter(d => d.assigned >= d.required).length}日`, "全14日中"],
    ["不足枠", `${shortage}枠`, "要調整"], ["平均充足率", `${Math.round(coverage.reduce((s,d)=>s+d.assigned/d.required,0)/14*100)}%`, "2週間平均"]
  ].map(x => `<article class="metric"><span>${x[0]}</span><strong>${x[1]}</strong><small>${x[2]}</small></article>`).join("");
  document.querySelector("#dayCards").innerHTML = coverage.map((d, i) => {
    const date = new Date(start); date.setDate(start.getDate() + i); const short = d.assigned < d.required;
    return `<article class="day ${short ? "short" : ""}"><div class="day-head"><strong>${pad(date.getMonth()+1)}/${pad(date.getDate())}</strong><span>${weekdays[date.getDay()]}</span></div><div class="coverage">${d.assigned}<small> / ${d.required}名</small></div><div class="track"><div class="fill" style="width:${Math.min(100,d.assigned/d.required*100)}%"></div></div><div class="day-note">${short ? `${d.required-d.assigned}名不足` : "必要人数を充足"}</div></article>`;
  }).join("");
  document.querySelector("#staffList").innerHTML = staff.map((s,i)=>`<div class="staff-row"><div><span class="avatar">${String.fromCharCode(65+i)}</span><span class="staff-name">${s.name}</span></div><span class="role">主担当: ${s.role}</span><span class="status">${s.status}</span></div>`).join("");
  document.querySelector("#sectionBars").innerHTML = sections.map(s=>`<div><div class="bar-label"><span>${s.name}</span><span>${s.value}%</span></div><div class="bar"><span style="width:${s.value}%"></span></div></div>`).join("");
}
document.querySelector("#startDate").addEventListener("change", render);
render();


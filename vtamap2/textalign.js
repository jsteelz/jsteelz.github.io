function textAnchor(d) {
  if (d == 'l') return "start";
  else if (d == 'r') return "end";
  else return "middle";
}

function dy(d) {
  if (d == 'b') return "0";
  else if (d == 'i') return ".7em";
  else if (d == 'di') return "1.8em";
  else if (d == 'ti') return "2.9em";
  else if (d == 'm') return ".35em";
  else if (d == 'dbm') return "1.45em";
  else if (d == 'tbm') return "2.55em";
  else if (d == 'qbm') return "3.65em";
  else if (d == "5bm") return "4.75em";
  else if (d == "6bm") return "5.85em";
  else if (d == 't') return "-.7em";
  else if (d == 'db') return "-1.1em";
  else if (d == 'tb') return "-2.2em";
  else if (d == 'ib') return "1.1em";
  else if (d == 'dib') return "2.2em";
  else return "0";
}

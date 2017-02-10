// Mustache template

const stratify = d3.stratify()
  .id(d => d)
  .parentId(d => d.substring(0, d.lastIndexOf('.')));

const width = 1200;
const height = 960;

const svg = d3.select('#tree')
  .attr('width', width)
  .attr('height', height)

const g = svg.append('g')
  .attr('transform', 'translate(80,80)')

const tree = d3.tree()
  .size([width - 160, height - 160]);

const data = {{{hierarchy}}};
const root = stratify(data);

update(root);

function update(root) {

  const link = g.selectAll('.link')
    .data(tree(root).descendants().slice(1))

  link.exit().remove()

  link.enter().append('path')
    .attr('class', 'link')
    .attr('d', d => {
      return "M" + d.x + "," + d.y
        + "C" + d.x + "," + (d.y + d.parent.y) / 2
        + " " + d.parent.x + "," + (d.y + d.parent.y) / 2
        + " " + d.parent.x + "," + d.parent.y;
    });

  const node = g.selectAll('.node')
    .data(root.descendants())
    .enter().append('g')
      .attr('class', d => 'node' + (d.children ? ' node--internal' : ' node--leaf'))
      .attr('transform', d => 'translate(' + d.x + ',' + d.y + ')')

  node.append('circle')
    .attr('r', 2.5);

  node.append('text')
    .attr('dy', 3)
    .attr('y', d => d.children ? -12 : 12)
    .style('text-anchor', 'middle')
    .text(d => d.id.substring(d.id.lastIndexOf('.') + 1));

}

import React, { Component, PropTypes } from 'react';
import d3 from 'd3';

import colors from '../../util/colors';
import { treeData } from './seedTreeData';

class Tree extends Component {
  componentDidMount() {
    this.mount = this.refs.tree;
    this.renderTree(this.mount, treeData(this.props.data));
  }

  componentDidUpdate() {
    this.removeTree();
    this.renderTree(this.mount, treeData(this.props.data));
  }

  removeTree() {
    d3.select(this.mount).selectAll('*').remove();
  }

  renderTree(mountNode, data) {
    const width = this.props.width;
    const height = this.props.height;
    const depthFactor = 7.5;
    const rectWidth = 18;
    const margin = { top: 0, bottom: 16, left: 136, right: 18 };
    const getTextX = (d) => {
      if (!d.children) {
        return rectWidth;
      }
      if (!d.parent) {
        return -rectWidth;
      }
      return -4;
    };
    const getNumberX = (d) => {
      if (!d.parent) {
        return rectWidth / 2;
      }
      if (d.children) {
        return rectWidth / 2 + 8;
      }
      return 0;
    };
    const getNumberY = (d) => {
      return -d.value / 4 - 8;
    };
    const getTextAnchor = (d) => {
      if (!d.children) {
        return 'start';
      }
      return 'end';
    };
    const getNodeDX = (d) => {
      if (d.name === 'Order Change Emails Not Opened (M)') {
        return d.x * 1.3;
      }
      return d.x * 1.2;
    };

    const root = data;

    const tree = d3.layout.tree()
      .size([(height - margin.top - margin.bottom), (width - margin.left - margin.right)])
    ;

    const diagonal = d3.svg.diagonal()
      .projection(d => [d.y, d.x])
    ;

    const svg = d3.select(mountNode)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
    ;

    let i = 0;
    const update = (base) => {
      const nodes = tree.nodes(base);
      const links = tree.links(nodes);
      nodes.forEach(d => d.y = d.depth * (this.props.width / depthFactor));
      nodes.forEach(d => d.x = getNodeDX(d));

      const node = svg.selectAll('g.node')
        .data(nodes, d => d.id || (d.id = ++i))
      ;

      const nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.y},${d.x})`)
      ;

      nodeEnter.append('rect')
        .attr('y', (d) => -(d.value / 4))
        .attr('x', (d) => (d.parent ? 0 : -rectWidth + 8))
        .attr('height', (d) => (d.value < 0 ? 1 : d.value / 2))
        .attr('width', 16)
        .style('fill', colors.primary)
     ;

      nodeEnter.append('text')
        .attr('x', d => getTextX(d))
        .attr('text-anchor', d => getTextAnchor(d))
        .attr('font-size', 12)
        .attr('font-family', 'lato')
        .text(d => `${d.name}`)
      ;

      nodeEnter.append('text')
        .attr('x', d => getNumberX(d))
        .attr('dy', d => getNumberY(d))
        .attr('text-anchor', d => getTextAnchor(d))
        .attr('font-size', 16)
        .attr('font-family', 'lato')
        .attr('fill', colors.primary)
        .text(d => `${d.value}`)
      ;

      const link = svg.selectAll('path.link')
        .data(links, d => d.target.id)
      ;

      link.enter().insert('path', 'g')
       .attr('class', 'link')
       .attr('d', diagonal)
       .attr('stroke-width', d => d.target.value / 2 || 2)
       .attr('fill', 'none')
       .attr('stroke', '#E0E0E0')
      ;
    };

    update(root);
  }

  render() {
    return (
      <svg ref="tree"></svg>
    );
  }
}

Tree.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
};

export default Tree;

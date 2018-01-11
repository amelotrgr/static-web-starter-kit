// Modules.
import React from 'react';
import { Link } from 'react-router-dom';
import * as animate from 'gsap-promise';
import classnames from 'classnames';

// Components.
import BaseSection from 'src/components/BaseSection';

// Styles.
import styles from './Test.css';

export default class Test extends BaseSection {

	constructor(props) {
		super(props);
	}

	animateIn(opt = {}) {
		return Promise.all([
			animate.fromTo(this.$node, 1, {
				y: '100%',
			}, {
				y: '0%',
				ease: Power3.easeOut,
				...opt,
			}),
		]);
	}

	animateOut(opt = {}) {
		return Promise.all([
			animate.to(this.$node, 1, {
				y: '-100%',
				ease: Power3.easeOut,
				...opt,
			}),
		]);
	}

	render() {

		const classes = classnames({
			'routeWrapper': true,
			[styles.Test]: true,
		});

		return (
			<section className={ classes } ref={ el => this.$node = el }>
				<img src="assets/images/c3p0.png" ref={ el => this.$img = el } />
				<Link to="/">Go Back</Link>
			</section>
		);

	}
	
}

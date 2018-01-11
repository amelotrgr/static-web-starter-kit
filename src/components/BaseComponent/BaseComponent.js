// Modules.
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BaseComponent extends Component {

	constructor (props) {

		super(props);

		this.__isAnimatingIn = false;
		this.__isAnimatingOut = false;
	
	}

	isAnimating () {
		return this.__isAnimatingIn || this.__isAnimatingOut;
	}

	isAnimatingOut () {
		return this.__isAnimatingOut;
	}

	isAnimatingIn () {
		return this.__isAnimatingIn;
	}

	componentWillAppear (done) {
		this.__handleAnimateIn(done);
	}

	componentWillEnter (done) {
		this.__handleAnimateIn(done);
	}

	__handleAnimateIn (done) {

		done();
		
		if (typeof this.animateIn === 'function') {

			this.__isAnimatingIn = true;
			const p = this.animateIn();

			if (p && typeof p.then === 'function') {
				p.then(() => {
					this.__isAnimatingIn = false;
				});
			} else {
				this.__isAnimatingIn = false;
			}

		}

	}

	componentWillLeave (done) {
		this.__handleAnimateOut(done);
	}

	__handleAnimateOut(done) {

		const next = () => {
			this.__isAnimatingOut = false;
			if (done) done();
		};

		if (typeof this.animateOut === 'function') {

			this.__isAnimatingOut = true;
			const promise = this.animateOut();
			
			if (promise && typeof promise.then === 'function')
				promise.then(next);
			else
				next();

		} else {
			next();
		}

	}

}

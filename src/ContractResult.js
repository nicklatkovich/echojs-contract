import _ from 'lodash';
import decode from './decoders';

/** @typedef {import('echojs-lib/types/echo/transaction').BroadcastingResult} BroadcastingResult */
/** @typedef {import('echojs-lib/types/echo/api').ContractResult} ContractResult */
/** @typedef {import('./Method').default} Method */

export default class Result {

	/**
	 * @readonly
	 * @type {Array<BroadcastingResult>}
	 */
	get transactionResult() { return _.cloneDeep(this._transactionResult); }

	/**
	 * @readonly
	 * @type {ContractResult}
	 */
	get contractResult() { return _.cloneDeep(this._contractResult); }

	/**
	 * @readonly
	 * @type {Array<any>|null|any}
	 */
	get decodedResult() { return _.cloneDeep(this._decodedResult); }

	/**
	 * @readonly
	 * @type {{[eventName: string]: { [field: string]: string }}}
	 */
	get events() { return _.cloneDeep(this._events); }

	/**
	 * @param {Method} method
	 * @param {BroadcastingResult} transactionResult
	 * @param {ContractResult} contractResult
	 */
	constructor(method, transactionResult, contractResult) {
		/**
		 * @private
		 * @type {BroadcastingResult}
		 */
		this._transactionResult = transactionResult;
		/**
		 * @private
		 * @type {ContractResult}
		 */
		this._contractResult = contractResult;
		/**
		 * @private
		 * @type {Array<any>|null|any}
		 */
		this._decodedResult = decode(this._contractResult.exec_res.output, method.outputs.map(({ type }) => type));
		/**
		 * @private
		 * @type {{[eventName: string]: { [field: string]: any }}}
		 */
		this._events = method.contract.parseLogs(contractResult.tr_receipt.log);
	}

}

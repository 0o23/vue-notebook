import React from 'react'
import './ReactComponent.css'

import { Advisor, getInsights, DataFrame } from '@antv/ava'
import { ChartView } from 'antv-site-demo-rc'
import { Select } from 'antd'
import { NarrativeTextVis, InsightCard } from '@antv/ava-react'

// ----------------------------------------------------------------------

// const data = [
// 	{
// 		date: '2023-08-03',
// 		failed: 0,
// 		success: 0,
// 	},
// 	{
// 		date: '2023-08-02',
// 		failed: 0,
// 		success: 1,
// 	},
// 	{
// 		date: '2023-08-01',
// 		failed: 0,
// 		success: 0,
// 	},
// 	{
// 		date: '2023-07-31',
// 		failed: 18,
// 		success: 67,
// 	},
// 	{
// 		date: '2023-07-30',
// 		failed: 0,
// 		success: 144,
// 	},
// 	{
// 		date: '2023-07-29',
// 		failed: 0,
// 		success: 144,
// 	},
// 	{
// 		date: '2023-07-28',
// 		failed: 0,
// 		success: 144,
// 	},
// 	{
// 		date: '2023-07-27',
// 		failed: 0,
// 		success: 144,
// 	},
// 	{
// 		date: '2023-07-26',
// 		failed: 1,
// 		success: 79,
// 	},
// 	{
// 		date: '2023-07-25',
// 		failed: 0,
// 		success: 1,
// 	},
// 	{
// 		date: '2023-08-07',
// 		failed: 0,
// 		success: 0,
// 	},
// 	{
// 		date: '2023-08-06',
// 		failed: 0,
// 		success: 0,
// 	},
// 	{
// 		date: '2023-08-05',
// 		failed: 0,
// 		success: 0,
// 	},
// 	{
// 		date: '2023-08-04',
// 		failed: 0,
// 		success: 0,
// 	},
// ]

const data = [
	{
		id: 112,
		appName: 'sapbw测试',
		appAbbreviation: 'sapbw',
		appDes: 'sapbw测试',
		appType: 1,
		appPrincipal: '李世纪',
		createTime: '2023-07-31T15:40:46',
		driveType: 'sapbw',
	},
	{
		id: 108,
		appName: 'rest1',
		appAbbreviation: 'rest1',
		appDes: 'rest1',
		appType: 0,
		appPrincipal: 'rest',
		createTime: '2023-07-24T13:34:25',
		driveType: 'RestfulAPI',
	},
	{
		id: 106,
		appName: 'D_GL',
		appAbbreviation: 'd_gl',
		appDes: '开发测试',
		appType: 0,
		appPrincipal: '开发测试',
		createTime: '2023-07-21T13:59:39',
		driveType: 'RestfulAPI',
	},
	{
		id: 105,
		appName: '非实时同步test',
		appAbbreviation: 'test',
		appDes: '测试',
		appType: 1,
		appPrincipal: 'lxy',
		createTime: '2023-07-17T18:20:13',
		driveType: 'sqlserver',
	},
	{
		id: 104,
		appName: '非sftp',
		appAbbreviation: 'np_sftp',
		appDes: '非sftp',
		appType: 1,
		appPrincipal: '非sftp',
		createTime: '2023-06-29T21:01:27',
		driveType: 'sqlserver',
	},
	{
		id: 103,
		appName: 'sftp9',
		appAbbreviation: 'sftp9',
		appDes: 'sftp9',
		appType: 1,
		appPrincipal: 'sftp9',
		createTime: '2023-06-29T20:59:49',
		driveType: 'sftp',
	},
	{
		id: 102,
		appName: 'sftp8',
		appAbbreviation: 'sftp8',
		appDes: 'sftp8',
		appType: 1,
		appPrincipal: 'sftp8',
		createTime: '2023-06-29T18:39:41',
		driveType: 'sftp',
	},
	{
		id: 101,
		appName: 'sftp7',
		appAbbreviation: 'sftp7',
		appDes: 'sftp7',
		appType: 1,
		appPrincipal: 'lsj',
		createTime: '2023-06-29T17:41:21',
		driveType: 'sftp',
	},
	{
		id: 96,
		appName: '管道重构测试',
		appAbbreviation: 'pipel_test',
		appDes: '',
		appType: 1,
		appPrincipal: 'wangjian',
		createTime: '2023-06-28T14:49:04',
		driveType: 'sqlserver',
	},
	{
		id: 94,
		appName: '实时测试',
		appAbbreviation: 'realtime_test',
		appDes: '',
		appType: 0,
		appPrincipal: 'xjj',
		createTime: '2023-06-28T09:44:23',
		driveType: 'RestfulAPI',
	},
	{
		id: 91,
		appName: 'pgtest',
		appAbbreviation: 'pgtest',
		appDes: 'pgtest',
		appType: 1,
		appPrincipal: 'lsj',
		createTime: '2023-06-13T09:36:47',
		driveType: 'postgresql',
	},
	{
		id: 90,
		appName: 'Employ_Testing',
		appAbbreviation: 'ET',
		appDes: '测试用',
		appType: 1,
		appPrincipal: 'yhxu',
		createTime: '2023-06-12T11:09:42',
		driveType: 'sqlserver',
	},
	{
		id: 78,
		appName: 'sftp',
		appAbbreviation: 'sftp',
		appDes: 'sftp',
		appType: 1,
		appPrincipal: 'sftp',
		createTime: '2023-05-25T17:29:10',
		driveType: 'sftp',
	},
	{
		id: 76,
		appName: '升达模拟测试',
		appAbbreviation: 'sdtest',
		appDes: '升达模拟测试',
		appType: 1,
		appPrincipal: 'wj',
		createTime: '2023-05-23T18:05:16',
		driveType: 'sqlserver',
	},
	{
		id: 51,
		appName: '线下文件',
		appAbbreviation: 'FS',
		appDes: '',
		appType: 1,
		appPrincipal: 'AnneY',
		createTime: '2023-03-03T09:23:39',
		driveType: 'sftp',
	},
	{
		id: 47,
		appName: '倍通',
		appAbbreviation: 'DDI',
		appDes: '',
		appType: 1,
		appPrincipal: 'AnneY',
		createTime: '2022-11-29T18:07:57',
		driveType: 'sftp',
	},
]

// const data = [
// 	{ price: 100, type: 'A' },
// 	{ price: 120, type: 'B' },
// 	{ price: 150, type: 'C' },
// 	{ price: 150, type: 'D' },
// 	{ price: 150, type: 'E' },
// 	{ price: 150, type: 'F' },
// ]

const results = getInsights(data, {
	limit: 3,
}).insights
console.log(results, 'results')

export default class App extends React.Component {
	render() {
		return (
			<>
				{results.length !== 0
					? results.map((item, index) => {
							return (
								<InsightCard
									key={index}
									insightInfo={item}
									visualizationOptions={{ lang: 'zh-CN' }}
								/>
							)
					  })
					: '无法对当前提供数据进行有效分析'}
			</>
		)
	}
}

// ----------------------------------------------------------------------

// const myChartAdvisor = new Advisor()

// export default class App extends React.Component {
// 	constructor(props) {
// 		super(props)

// 		this.state = {
// 			selectedValue: 0,

// 			data,
// 			selectOptions: [],

// 			results: myChartAdvisor.advise({ data }).map(advice => {
// 				const lints = myChartAdvisor.lint({ spec: advice.spec })
// 				return { ...advice, lint: lints }
// 			}),
// 		}

// 		this.myRef = React.createRef()
// 	}

// 	handleChange = value => {
// 		this.setState({ selectedValue: value })
// 	}

// 	render() {
// 		const { results, selectedValue } = this.state

// 		const selectOptions = results.map((obj, index) => {
// 			const { type: label } = obj

// 			return {
// 				label,
// 				value: index,
// 			}
// 		})
// 		console.log(results, 'results')

// 		return (
// 			<>
// 				{selectOptions.length !== 0 ? (
// 					<>
// 						<Select
// 							defaultValue={selectedValue}
// 							style={{ width: 200 }}
// 							options={selectOptions}
// 							onChange={this.handleChange}
// 						/>
// 						{/* <InsightCard insightInfo={results[selectedValue].spec} /> */}
// 						{/* <NarrativeTextVis spec={results[selectedValue].spec} /> */}
// 						<ChartView chartRef={this.myRef} spec={results[selectedValue]?.spec ?? {}} />
// 					</>
// 				) : (
// 					'无法对当前提供数据进行有效分析'
// 				)}
// 			</>
// 		)
// 	}
// }

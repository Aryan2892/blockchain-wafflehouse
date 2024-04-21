import * as fcl from '@onflow/fcl'
import React, { useEffect, useState } from 'react'
import ReadHelloWorld from '../cadence/scripts/ReadHelloWorld.cdc'
import UpdateHelloWorld from '../cadence/transactions/UpdateHelloWorld.cdc'
import elementStyles from '../styles/Elements.module.css'
import containerStyles from '../styles/Container.module.css'
import useConfig from '../hooks/useConfig'
import { createExplorerTransactionLink } from '../helpers/links'
import studentsData from '../students.json';
import copyIcon from './copy-icon.png';

export default function Container() {
  const [chainGreeting, setChainGreeting] = useState<string[]>()
  const [userGreetingInput, setUserGreetingInput] = useState('')
  const [lastTransactionId, setLastTransactionId] = useState<string>()
  const [transactionStatus, setTransactionStatus] = useState<number>()
  const { network } = useConfig()

  const isEmulator = network => network !== 'mainnet' && network !== 'testnet'
  const isSealed = statusCode => statusCode === 4 // 4: 'SEALED'

  const copyToClipboard = (name: string) => {
    navigator.clipboard.writeText(name)
      .then(() => console.log(`Copied ${name} to clipboard`))
      .catch(error => console.error('Error copying to clipboard:', error));
  };

  useEffect(() => {
    if (lastTransactionId) {
      console.log('Last Transaction ID: ', lastTransactionId)

      fcl.tx(lastTransactionId).subscribe(res => {
        setTransactionStatus(res.statusString)
  
        // Query for new chain string again if status is sealed
        if (isSealed(res.status)) {
          queryChain()
        }
      })
    }
  }, [lastTransactionId])

  const queryChain = async () => {
    const res = await fcl.query({
      cadence: ReadHelloWorld
    })

    setChainGreeting(res)
  }

  const mutateGreeting = async (event) => {
    event.preventDefault()

    if (!userGreetingInput.length) {
      throw new Error('Please add a new greeting string.')
    }

    const currentDate = new Date().toISOString().slice(0, 10);

    const transactionId = await fcl.mutate({
      cadence: UpdateHelloWorld,
      args: (arg, t) => [arg(userGreetingInput + " - " + currentDate, t.String)],
    })

    setLastTransactionId(transactionId)
  }
  
  const openExplorerLink = (transactionId, network) => window.open(createExplorerTransactionLink({ network, transactionId }), '_blank')

  return (
    <div className={containerStyles.container}>
      <div className={containerStyles.spacing}>
      <h3>Student List:</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '5px', marginBottom: '5px' }}>
        {studentsData.map((student, index) => (
          <React.Fragment key={index}>
            <p style={{ textAlign: 'left', margin: '0', marginRight: '5px' }}>{student}</p>
            <button onClick={() => copyToClipboard(student)}>
              <img src={copyIcon.src} alt="Copy" style={{ width: '16px', height: '16px' }} />
            </button>
          </React.Fragment>
        ))}
      </div>
    </div>
      <div>
        <h2>Query the Attendance Chain</h2>  
        <button onClick={queryChain} className={elementStyles.button}>Query</button>
        <h4>Student Name(s) on Chain: </h4>
        {chainGreeting ? (
          chainGreeting.slice().reverse().map((name, index) => (
            <div key={index}>{name}</div>
          ))
        ) : (
          <div></div>
        )}

      </div>
      <hr />
      <div>
        <h2>Add Student as Absent</h2>
        {!isEmulator(network) && (
          <h4>Latest Transaction ID: <a className={elementStyles.link} onClick={() => {openExplorerLink(lastTransactionId, network)}}>{ lastTransactionId }</a></h4>
        )}
        <h4>Latest Transaction Status: { transactionStatus }</h4>
        <form onSubmit={mutateGreeting}>
          <label>
            <input
              type='text'
              placeholder='Add Student'
              value={userGreetingInput}
              onChange={e => setUserGreetingInput(e.target.value)}
              className={elementStyles.input}
            />
          </label>
          <input type='submit' value='Submit' className={elementStyles.button} />
        </form>
      </div>
    </div>
  )
}
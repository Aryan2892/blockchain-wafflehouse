import * as fcl from '@onflow/fcl'
import { useEffect, useState } from 'react'
import ReadHelloWorld from '../cadence/scripts/ReadHelloWorld.cdc'
import UpdateHelloWorld from '../cadence/transactions/UpdateHelloWorld.cdc'
import elementStyles from '../styles/Elements.module.css'
import containerStyles from '../styles/Container.module.css'
import useConfig from '../hooks/useConfig'
import { createExplorerTransactionLink } from '../helpers/links'

export default function Container() {
  const [chainGreeting, setChainGreeting] = useState<string[]>()
  const [userGreetingInput, setUserGreetingInput] = useState('')
  const [lastTransactionId, setLastTransactionId] = useState<string>()
  const [transactionStatus, setTransactionStatus] = useState<number>()
  const { network } = useConfig()

  const isEmulator = network => network !== 'mainnet' && network !== 'testnet'
  const isSealed = statusCode => statusCode === 4 // 4: 'SEALED'

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
        <p style={{ textAlign: "left" }}>Mohamad Häusler</p>
        <p style={{ textAlign: "left" }}>Kristina Poirier</p>
        <p style={{ textAlign: "left" }}>Frigg Allen</p>
        <p style={{ textAlign: "left" }}>Angélique Kjær</p>
        <p style={{ textAlign: "left" }}>Rayna Russo</p>
        <p style={{ textAlign: "left" }}>Lynn Warren</p>
        <p style={{ textAlign: "left" }}>Rolland Seymour</p>
        <p style={{ textAlign: "left" }}>Kristine Faulkner</p>
        <p style={{ textAlign: "left" }}>Makenzie Yoxall</p>
        <p style={{ textAlign: "left" }}>Raphael John</p>
      </div>
      <div>
        <h2>Query the Attendance Chain</h2>  
        <button onClick={queryChain} className={elementStyles.button}>Query</button>
        <h4>Student Name(s) on Chain: </h4>
        {chainGreeting ? (
          chainGreeting.map((name, index) => (
            <div key={index}>{name}</div>
          ))
        ) : (
          <div>Loading...</div>
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
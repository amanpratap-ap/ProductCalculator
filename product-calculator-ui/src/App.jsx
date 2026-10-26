import { useEffect, useState } from 'react'
import './App.css'

const API_URL = 'http://localhost:5000/api/Calculator'

function App() {
    const [firstNumber, setFirstNumber] = useState('')
    const [secondNumber, setSecondNumber] = useState('')
    const [result, setResult] = useState(null)

    const [history, setHistory] = useState([])
    const [search, setSearch] = useState('')
    const [loadingHistory, setLoadingHistory] = useState(false)

    // Load history when the application starts
    useEffect(() => {
        loadHistory()
    }, [])

    // GET /api/Calculator/history
    const loadHistory = async () => {
        try {
            setLoadingHistory(true)

            const response = await fetch(`${API_URL}/history`)

            if (!response.ok) {
                throw new Error('Failed to load history')
            }

            const data = await response.json()
            setHistory(data)
        } catch (error) {
            console.error('History error:', error)
        } finally {
            setLoadingHistory(false)
        }
    }

    // POST /api/Calculator/multiply
    const multiply = async () => {
        if (firstNumber === '' || secondNumber === '') {
            setResult('Enter both numbers')
            return
        }

        try {
            const response = await fetch(`${API_URL}/multiply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstNumber: Number(firstNumber),
                    secondNumber: Number(secondNumber),
                }),
            })

            if (!response.ok) {
                throw new Error('API request failed')
            }

            const data = await response.json()

            setResult(data)

            // Refresh history after calculation
            loadHistory()

        } catch (error) {
            console.error(error)
            setResult('Error connecting to backend')
        }
    }

    // DELETE /api/Calculator/history
    const clearHistory = async () => {
        try {
            const response = await fetch(`${API_URL}/history`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Failed to clear history')
            }

            setHistory([])
        } catch (error) {
            console.error('Clear history error:', error)
        }
    }

    // DELETE /api/Calculator/history/{index}
    const deleteCalculation = async (index) => {
        try {
            const response = await fetch(`${API_URL}/history/${index}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Failed to delete calculation')
            }

            loadHistory()
        } catch (error) {
            console.error('Delete error:', error)
        }
    }

    // Search/filter history
    const filteredHistory = history.filter((calculation) => {
        const text = `
            ${calculation.firstNumber}
            ${calculation.secondNumber}
            ${calculation.result}
        `.toLowerCase()

        return text.includes(search.toLowerCase())
    })

    return (
        <div className="app">

            {/* Background effects */}
            <div className="background-glow glow-one"></div>
            <div className="background-glow glow-two"></div>

            <main className="calculator-container">

                {/* Header */}
                <div className="status">
                    <span className="status-dot"></span>
                    SYSTEM ONLINE
                </div>

                <p className="brand">×CALCX</p>

                <h1>
                    Calculate
                    <br />
                    <span>Instantly.</span>
                </h1>

                <p className="subtitle">
                    A modern calculation engine powered by
                    <br />
                    React + ASP.NET Core
                </p>

                {/* Calculator Card */}
                <section className="calculator-card">

                    <div className="card-label">
                        MULTIPLICATION
                    </div>

                    <h2>Product Calculator</h2>

                    <div className="input-group">

                        <label>FIRST NUMBER</label>

                        <input
                            type="number"
                            placeholder="00"
                            value={firstNumber}
                            onChange={(e) =>
                                setFirstNumber(e.target.value)
                            }
                        />

                    </div>

                    <div className="operator">×</div>

                    <div className="input-group">

                        <label>SECOND NUMBER</label>

                        <input
                            type="number"
                            placeholder="00"
                            value={secondNumber}
                            onChange={(e) =>
                                setSecondNumber(e.target.value)
                            }
                        />

                    </div>

                    <div className="button-row">

                        <button
                            className="calculate-button"
                            onClick={multiply}
                        >
                            CALCULATE PRODUCT →
                        </button>

                        <button
                            className="clear-button"
                            onClick={() => {
                                setFirstNumber('')
                                setSecondNumber('')
                                setResult(null)
                            }}
                        >
                            Clear
                        </button>

                    </div>

                    {/* Result */}
                    {result !== null && (
                        <div className="result-box">

                            <span>RESULT</span>

                            <strong>
                                {typeof result === 'number'
                                    ? result
                                    : result}
                            </strong>

                        </div>
                    )}

                </section>

                {/* History */}
                <section className="history-card">

                    <div className="history-header">

                        <div>
                            <span className="history-label">
                                CALCULATION LOG
                            </span>

                            <h2>Search History</h2>
                        </div>

                        {history.length > 0 && (
                            <button
                                className="clear-history"
                                onClick={clearHistory}
                            >
                                Clear All
                            </button>
                        )}

                    </div>

                    {/* Search */}
                    <div className="search-box">

                        <span>⌕</span>

                        <input
                            type="text"
                            placeholder="Search calculations..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>

                    {/* History results */}
                    <div className="history-list">

                        {loadingHistory && (
                            <div className="history-empty">
                                Loading history...
                            </div>
                        )}

                        {!loadingHistory &&
                            filteredHistory.length === 0 && (
                                <div className="history-empty">
                                    <div className="empty-icon">
                                        ◇
                                    </div>

                                    <p>
                                        {search
                                            ? 'No matching calculations'
                                            : 'No calculations yet'}
                                    </p>

                                    <small>
                                        Your calculation history will
                                        appear here.
                                    </small>
                                </div>
                            )}

                        {!loadingHistory &&
                            filteredHistory.map(
                                (calculation, index) => {

                                    // Find the actual index in original array
                                    const originalIndex =
                                        history.indexOf(calculation)

                                    return (
                                        <div
                                            className="history-item"
                                            key={index}
                                        >

                                            <div className="history-expression">

                                                <span>
                                                    {calculation.firstNumber}
                                                </span>

                                                <b>×</b>

                                                <span>
                                                    {calculation.secondNumber}
                                                </span>

                                                <b>=</b>

                                                <strong>
                                                    {calculation.result}
                                                </strong>

                                            </div>

                                            <button
                                                className="delete-button"
                                                onClick={() =>
                                                    deleteCalculation(
                                                        originalIndex
                                                    )
                                                }
                                            >
                                                ×
                                            </button>

                                        </div>
                                    )
                                }
                            )}

                    </div>

                    <div className="tech-stack">
                        REACT • ASP.NET CORE • REST API
                    </div>

                </section>

            </main>
        </div>
    )
}

export default App
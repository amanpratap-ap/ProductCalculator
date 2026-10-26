using Microsoft.AspNetCore.Mvc;
using ProductCalculator.Models;
using ProductCalculator.Services;

namespace ProductCalculator.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CalculatorController : ControllerBase
{
    private CalculatorService calculator;
    private HistoryService history;

    public CalculatorController(
        CalculatorService calculator,
        HistoryService history)
    {
        this.calculator = calculator;
        this.history = history;
    }

    [HttpPost("multiply")]
    public double Multiply(Calculation calculation)
    {
        double result = calculator.Multiply(
            calculation.FirstNumber,
            calculation.SecondNumber);

        calculation.Result = result;

        history.Add(calculation);

        return result;
    }

    [HttpGet("history")]
    public List<Calculation> GetHistory()
    {
        return history.GetAll();
    }

    [HttpPut("history/{index}")]
    public IActionResult UpdateHistory(
        int index,
        Calculation calculation)
    {
        double result = calculator.Multiply(
            calculation.FirstNumber,
            calculation.SecondNumber);

        calculation.Result = result;

        history.Update(index, calculation);

        return Ok(calculation);
    }

    [HttpDelete("history/{index}")]
    public IActionResult DeleteHistory(int index)
    {
        history.Delete(index);

        return Ok("Calculation deleted successfully.");
    }

    [HttpDelete("history")]
    public void ClearHistory()
    {
        history.Clear();
    }
}
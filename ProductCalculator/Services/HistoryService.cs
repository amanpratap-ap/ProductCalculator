using ProductCalculator.Models;

namespace ProductCalculator.Services;

public class HistoryService
{
    private List<Calculation> calculations = new List<Calculation>();

    public void Add(Calculation calculation)
    {
        calculations.Add(calculation);
    }

    public List<Calculation> GetAll()
    {
        return calculations;
    }

    public void Delete(int index)
    {
        if (index >= 0 && index < calculations.Count)
        {
            calculations.RemoveAt(index);
        }
    }

    public void Update(int index, Calculation calculation)
    {
        if (index >= 0 && index < calculations.Count)
        {
            calculations[index] = calculation;
        }
    }

    public void Show()
    {
        if (calculations.Count == 0)
        {
            Console.WriteLine("No calculations stored.");
            return;
        }

        Console.WriteLine("Calculation History:");

        foreach (Calculation calculation in calculations)
        {
            Console.WriteLine(
                $"{calculation.FirstNumber} × {calculation.SecondNumber} = {calculation.Result}");
        }
    }

    public void Clear()
    {
        calculations.Clear();
        Console.WriteLine("History cleared.");
    }
}
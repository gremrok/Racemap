using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Importer
{
    class Program
    {
        static void Main(string[] args)
        {
            var package = new ExcelPackage(new FileInfo(@"C:\Users\Kaktus\Downloads\convertcsv (1).xlsx"));
            var sb = new StringBuilder();
            ExcelWorksheet workSheet = package.Workbook.Worksheets[1];
            var list = new List<Item>();
            for (int i = workSheet.Dimension.Start.Row+1;
                    i <= workSheet.Dimension.End.Row;
                    i++)
            {
                var item = new Item();
                
                item.info = workSheet.Cells[i, 1].Value.ToString().Replace("'", "''");
                item.name = workSheet.Cells[i, 2].Value.ToString().Replace("'", "''");
                item.address = workSheet.Cells[i, 3].Value.ToString().Replace("'", "''");
                item.person = workSheet.Cells[i, 4].Value.ToString().Replace("'", "''");
                item.www = workSheet.Cells[i, 5].Value.ToString();
                item.email = workSheet.Cells[i, 6].Value.ToString().Replace("'", "''");
                item.phones = workSheet.Cells[i, 7].Value.ToString();
                item.month = workSheet.Cells[i, 8].Value.ToString();
                item.isAims = workSheet.Cells[i, 9].Value.ToString();
                item.lat = workSheet.Cells[i, 10].Value.ToString();
                item.lng = workSheet.Cells[i, 11].Value.ToString();
                item.categories = workSheet.Cells[i, 12].Value.ToString();
                item.startDate = workSheet.Cells[i, 13].Value.ToString();
                item.endDate = workSheet.Cells[i, 14].Value.ToString();
                item.fb = workSheet.Cells[i, 15].Value.ToString();
                item.id = workSheet.Cells[i, 16].Value.ToString();
                item.distances = workSheet.Cells[i, 17].Value.ToString();
                item.emails = workSheet.Cells[i, 18].Value.ToString().Replace("'", "''");
                item.sites = workSheet.Cells[i, 19].Value.ToString();
                item.place = workSheet.Cells[i, 20].Value.ToString().Replace("'", "''");
                item.orderId = i;
                sb.AppendFormat("insert into Sheet values ('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}','{12}','{13}','{14}','{15}','{16}','{17}','{18}','{19}','{20}');\n",
                    item.info, item.name, item.address, item.person, item.www, item.email, item.phones, item.month, item.isAims, item.lat, item.lng, item.categories, item.startDate, item.endDate, item.fb, item.id, item.distances, item.emails, item.sites, item.place, item.orderId);


            }

            var sql = sb.ToString();
            
        }

        
    }

    public class Item{
        public string info{get;set;}
        public string name{get;set;}
        public string address{get;set;}
        public string person{get;set;}
        public string www{get;set;}
        public string email{get;set;}
        public string phones{get;set;}
        public string month{get;set;}
        public string isAims{get;set;}
        public string lat{get;set;}
        public string lng{get;set;}
        public string categories{get;set;}
        public string startDate{get;set;}
        public string endDate{get;set;}
        public string fb{get;set;}
        public string id { get; set; }
        public string distances{get;set;}
        public string emails{get;set;}
        public string sites{get;set;}
        public string place{get;set;}
        public int orderId { get; set; }
    }
}

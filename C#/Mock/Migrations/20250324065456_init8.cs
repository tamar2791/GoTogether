using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mock.Migrations
{
    /// <inheritdoc />
    public partial class init8 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CountSeats",
                table: "Driver");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Driver",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Driver",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "Driver",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Driver");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "Driver");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Driver");

            migrationBuilder.AddColumn<int>(
                name: "CountSeats",
                table: "Driver",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
